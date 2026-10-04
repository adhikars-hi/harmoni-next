'use client'

import { useEffect, useRef } from 'react'

/**
 * Plays a video that was rendered on solid black and shows it with the black
 * removed, so whatever sits behind it (page colour, grid, dust) shows through.
 *
 * The hero clip is H.264 with no alpha channel. CSS blend modes can't help
 * here: <main> is its own stacking context, so a blended video only blends
 * against an empty layer and the black stays. Instead each frame is drawn to
 * a WebGL canvas and a small shader turns brightness into transparency:
 *
 *   - a frame of "colour over black" is already a premultiplied image, so
 *     alpha can be derived from the brightest channel and the colour kept;
 *   - `gain` lifts alpha in the dim navy glow around the head, so it reads as
 *     a soft dark halo over the grid (as in the Figma) instead of vanishing;
 *   - `floor` drops compression noise in the background to fully clear.
 *
 * Falls back to the plain video if WebGL isn't available.
 */
export default function KeyedVideo({ src, className, gain = 2.0, floor = 0.035, playOnScroll = false, progress = null }) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const visibleRef = useRef(true)

  /*
   * playOnScroll: the clip only runs while the visitor is scrolling. Every
   * scroll / wheel / touch-move (re)starts playback and pushes a short timer;
   * when no scrolling has happened for SCROLL_IDLE ms the clip pauses on its
   * current frame and resumes from there on the next scroll.
   */
  useEffect(() => {
    if (!playOnScroll) return
    const video = videoRef.current
    const SCROLL_IDLE = 160
    let timer = 0
    const onScroll = () => {
      if (!visibleRef.current) return
      if (video.paused) video.play().catch(() => {})
      clearTimeout(timer)
      timer = setTimeout(() => video.pause(), SCROLL_IDLE)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onScroll, { passive: true })
    window.addEventListener('touchmove', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
    }
  }, [playOnScroll])

  /*
   * progress: a 0..1 motion value that *scrubs* the clip — the frame shown is
   * tied to scroll position, so the whole animation always plays out across
   * the scroll distance however fast the visitor scrolls, and runs backwards
   * when they scroll back up. Seeks are chained (a new one is only issued once
   * the previous frame has arrived) so fast scrolling never queues up a
   * backlog; the clip should be encoded with a keyframe on every frame
   * (see public/videos/hero-video-scrub.mp4) so each seek is instant.
   */
  useEffect(() => {
    if (!progress) return
    const video = videoRef.current
    let pending = null
    video.pause()
    const seek = (frac) => {
      const d = video.duration
      if (!d || video.readyState < 1) { pending = frac; return }
      if (video.seeking) { pending = frac; return }
      const t = Math.min(d - 0.04, Math.max(0, frac * d))
      if (Math.abs(video.currentTime - t) < 1 / 60) return
      video.currentTime = t
    }
    const onSeeked = () => {
      if (pending == null) return
      const f = pending
      pending = null
      seek(f)
    }
    const onMeta = () => seek(progress.get())
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('loadeddata', onMeta)
    const unsub = progress.on('change', seek)
    seek(progress.get())
    return () => {
      unsub()
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('loadeddata', onMeta)
    }
  }, [progress])

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) {
      wrap.classList.add('keyed-video--fallback')
      return
    }

    const vs = `attribute vec2 p; varying vec2 uv;
      void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`
    const fs = `precision mediump float; varying vec2 uv; uniform sampler2D t;
      uniform float gain; uniform float floorV;
      void main(){
        vec3 c = texture2D(t, uv).rgb;
        float m = max(c.r, max(c.g, c.b));
        float a = clamp((m - floorV) * gain, 0., 1.);
        gl_FragColor = vec4(min(c, vec3(a)), a);
      }`
    const sh = (type, code) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, code); gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      wrap.classList.add('keyed-video--fallback')
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.uniform1f(gl.getUniformLocation(prog, 'gain'), gain)
    gl.uniform1f(gl.getUniformLocation(prog, 'floorV'), floor)

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.clearColor(0, 0, 0, 0)

    const size = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      // never render above the clip's own resolution
      const w = Math.max(1, Math.round(Math.min(r.width * dpr, video.videoWidth || 1920)))
      // keep the clip's own aspect; CSS object-fit decides cover/contain
      const ar = video.videoWidth ? video.videoHeight / video.videoWidth : 9 / 16
      const h = Math.max(1, Math.round(w * ar))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    let raf = 0, vfc = 0, visible = true, alive = true
    const draw = () => {
      if (video.readyState >= 2) {
        size()
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
    }
    const useVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype
    const loop = () => {
      if (!alive) return
      if (visible) draw()
      if (useVFC) vfc = video.requestVideoFrameCallback(loop)
      else raf = requestAnimationFrame(loop)
    }
    loop()
    // paint the first frame as soon as it's decoded (also covers paused / reduced-motion)
    const onData = () => draw()
    video.addEventListener('loadeddata', onData)
    video.addEventListener('seeked', onData)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      visibleRef.current = visible
      if (visible) {
        // scroll-driven clips start paused; the scroll handler plays them
        if (!playOnScroll && !progress) video.play?.().catch(() => {})
        draw()
      } else video.pause?.()
    })
    io.observe(wrap)
    const onResize = () => draw()
    window.addEventListener('resize', onResize)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      if (useVFC && vfc) video.cancelVideoFrameCallback(vfc)
      video.removeEventListener('loadeddata', onData)
      video.removeEventListener('seeked', onData)
      window.removeEventListener('resize', onResize)
      io.disconnect()
    }
  }, [gain, floor, playOnScroll, progress])

  return (
    <div ref={wrapRef} className={`keyed-video ${className || ''}`}>
      <video
        ref={videoRef}
        className="keyed-video__src"
        src={src}
        autoPlay={!playOnScroll && !progress}
        muted
        loop={!progress}
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className="keyed-video__canvas" role="img" aria-label="Animated AI head" />
    </div>
  )
}
