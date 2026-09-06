import { site } from '../data/site'

export function About() {
  return (
    <section id="about" className="section">
      <div className="about-grid">
        <div>
          <span className="section-index">05 — Person</span>
          <h2 className="about-name">{site.name}</h2>
          <p className="about-role">{site.role}</p>
        </div>
        <div>
          <p className="about-copy">
            Daimo builds websites, interfaces, chatbots, and digital experiences. The work is
            quiet on the surface and precise underneath — type as architecture, motion as meaning,
            conversation as a designed object.
          </p>
          <div className="facts">
            <div>
              <span>Presence</span>
              <span>{site.location}</span>
            </div>
            <div>
              <span>Status</span>
              <span>{site.availability}</span>
            </div>
            <div>
              <span>Year</span>
              <span>{site.year}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
