import { useRef, useState } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'
import { services } from '../data/site'

export function Services() {
  const root = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState<string | null>(services[0].number)

  useRef(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>('.service')
      gsap.fromTo(items, { opacity: 0, y: 40, rotateX: -8 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section">
      <div className="section-head">
        <span className="section-index">06 — Practice</span>
        <span className="kicker">Services</span>
      </div>
      <ul ref={root} className="service-list">
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
