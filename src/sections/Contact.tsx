import { site, socials } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <span className="section-index">08 — Close</span>
      <h2 className="contact-title">
        Let&apos;s build
        <br />
        something
        <br />
        interesting.
      </h2>
      <a className="cta" href={`mailto:${site.email}`} data-cursor="WRITE">
        Start a project <i aria-hidden="true">→</i>
      </a>
      <div className="contact-links">
        <span>
          {site.email} · {site.emailNote}
        </span>
        {socials.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  )
}
