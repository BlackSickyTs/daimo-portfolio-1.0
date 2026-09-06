import { useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'
import { site } from '../data/site'

export function About() {
  const root = useRef<HTMLElement>(null)

  useRef(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const name = el.querySelector<HTMLElement>('.about-name')
      const role = el.querySelector<HTMLElement>('.about-role')
      const copy = el.querySelector<HTMLElement>('.about-copy')
      const facts = el.querySelectorAll<HTMLElement>('.facts div')

      gsap.fromTo(name, { opacity: 0, y: 60, rotateX: -10 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
      gsap.fromTo(role, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } })
      gsap.fromTo(copy, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
      gsap.fromTo(facts, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={root} className="section">
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
