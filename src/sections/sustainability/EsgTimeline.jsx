'use client'

import { Reveal } from '../../components/ui'

const GROUPS = [
  {
    tone: 'orange',
    pill: 'Digital Skilling & Digital Empowerment and Livelihood Support',
    items: [
      { name: 'Centum Foundation', detail: 'Sonata Software and Centum Foundation trained 250 final-year students—90% women—in Data Analytics and Dynamics 365. The program included college-based training, assessments, certification, and placement support, with 70% receiving job assistance. It successfully boosted digital skills and career readiness among underserved youth.', impact: 'Sonata trained 250 underserved youth—90% women—in tech skills, placing 175 in jobs and impacting 750 lives by boosting employability, confidence, and inclusion.' },
      { name: 'Indian Institute of Science (IISc)', detail: 'CSR grant to Foundation for Science, Innovation and Development for promotion of scientific research, outreach and education at CSA department.', impact: 'Supports outreach, education, research in software engineering and responsible AI, infrastructure development, and AI startups.' },
      { name: 'Functional Vocational Training & Research Society (FVTRS)', detail: 'Empowering youth with future-ready tech skills, including developing a website to build a digital presence and streamline asset and inventory management.', impact: 'This initiative trained 250 students—mostly women—in Java Full Stack and Cloud Computing, enabling 60+ internships and placements. It boosted employability, confidence, and digital skills, impacting over 1,000 lives in semi-urban communities.' },
      { name: 'INDUSTREE Crafts Foundation', detail: 'The Industree application helps users manage assets and content easily, making work faster and more efficient. Its flexible design allows new features to be added as needed. A simple and user-friendly interface ensures easy navigation. Real-time tracking helps monitor assets and courses effectively. With useful insights, users can make better decisions and improve operations.', impact: 'The Co-Create app helps preserve traditional art by storing artisan designs and products, while empowering over 400 artisans with wider market access and economic opportunities.' },
      { name: 'Sense International India', detail: 'Sense is a national-level non-profit organization supporting specialized services that enable children and adults with deafblindness and multiple disabilities to access education, rehabilitation, healthcare, assistive support, inclusion and livelihood opportunities.', impact: 'Enhancing quality of life by providing educational and social inclusion of children with deafblindness.' },
      { name: 'SARTHAK', detail: 'SARTHAK, a leading nationally recognized and award-winning non-profit organization dedicated to empowering Persons with Disabilities (PwDs) through skill development and employment opportunities. The platform would be designed to bridge the accessibility gap in purchasing essential products, assistive devices, and livelihood opportunities for PwDs.', impact: 'Providing opportunity to PwD by connecting them to digital marketplace, thereby uplifting their daily livelihood.' },
    ],
  },
  {
    tone: 'blue',
    pill: 'Health Care & Education and Biodiversity Protection',
    items: [
      { name: 'AEH Arvind Eye Hospital', detail: 'Sonata’s AEH VIKAS App is an Android-based tool designed to support children with cerebral visual impairment (CVI) through early diagnosis and tailored visual therapies.', impact: 'The app offers diagnostic tools and interactive exercises to improve visual and perceptual skills in children with CVI.' },
      { name: 'SayTrees Environmental Trust', detail: 'Using the Miyawaki technique, 1,240 native saplings will be planted in underused urban spaces to create dense forests. These green zones will reduce noise, improve air quality, support biodiversity, and enhance the railway station’s environment—growing over 25 feet in just 2–3 years and enriching urban life sustainably.', impact: '1,240 saplings in a compact urban forest setup.' },
    ],
  },
]

export default function EsgTimeline() {
  return (
    <section className="section sus-sec sus-timeline">
      <div className="container">
        <Reveal as="h2" className="sus-h2 center">ESG @ Sonata</Reveal>
        {GROUPS.map((g) => (
          <div key={g.pill} className={`sus-group ${g.tone}`}>
            <Reveal className="sus-pill"><span>{g.pill}</span></Reveal>
            {g.items.map((it, i) => (
              <Reveal key={it.name} y={28} amount={0.2} className={`sus-row ${i % 2 === 0 ? 'card-right' : 'card-left'}`}>
                <div className="sus-cell label"><h3>{it.name}</h3></div>
                <span className="sus-node" aria-hidden="true" />
                <div className="sus-cell">
                  <article className="sus-tl-card">
                    <h4>PROJECT DETAIL</h4>
                    <p>{it.detail}</p>
                    <h4>PROJECT IMPACT</h4>
                    <p>{it.impact}</p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
