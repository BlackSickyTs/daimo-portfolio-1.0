import { useState } from 'react'
import { services } from '../data/site'

export function Services() {
  const [open, setOpen] = useState<string | null>(services[0].number)

  return (
    <section className="section">
      <div className="section-head">
        <span className="section-index">06 — Practice</span>
        <span className="kicker">Services</span>
      </div>
      <ul className="service-list">
        {services.map((service) => {
          const active = open === service.number
          return (
            <li key={service.number}>
              <button
                type="button"
                className={`service${active ? ' is-open' : ''}`}
                aria-expanded={active}
                onClick={() => setOpen(active ? null : service.number)}
              >
                <span className="meta">{service.number}</span>
                <span>
                  <span className="service-title">{service.title}</span>
                  <span className="service-copy">{service.copy}</span>
                </span>
                <span className="service-mark" aria-hidden="true">
                  +
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
