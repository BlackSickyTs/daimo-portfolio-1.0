import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { CharBoom } from '../components/CharBoom'
import { site, socials } from '../data/site'

export function Contact() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const title = el.querySelector<HTMLElement>('.contact-title')
      const cta = el.querySelector<HTMLElement>('.cta')
      const links = el.querySelectorAll<HTMLElement>('.contact-links span')

      if (title) gsap.fromTo(title, { opacity: 0, y: 80, rotateX: -15, scale: 0.7 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: el, start: 'top 75%' } })
      if (cta) gsap.fromTo(cta, { opacity: 0, x: -60, rotateY: -20 }, { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 78%' } })
      if (links) gsap.fromTo(links, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={root} className="section contact">
      <span className="section-index">08 — Close</span>
      <h2 className="contact-title">
        <CharBoom text="Let's build" />
        <br />
        <CharBoom text="something" />
        <br />
        <CharBoom text="interesting." />
      </h2>
      <a className="cta" href={`mailto:${site.email}`} data-cursor="WRITE">
        Start a project <i aria-hidden="true">→</i>
      </a>
      <div className="contact-links">
        <span>
          {site.email}
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
