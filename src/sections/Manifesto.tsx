import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, splitWords } from '../lib/motion'

export function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    const line = el?.querySelector<HTMLElement>('.manifesto-line')
    if (!el || !line || prefersReducedMotion()) return

    const original = line.innerHTML
    const words = splitWords(line)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: 0.65,
          },
        },
      )
    }, el)

    return () => {
      ctx.revert()
      line.innerHTML = original
    }
  }, [])

  return (
    <section id="manifesto" ref={root} className="section manifesto">
      <div className="section-head">
        <span className="section-index">01 — Position</span>
        <span className="kicker">Manifesto</span>
      </div>
      <p className="manifesto-line">
        I build digital experiences that feel as good as they function. Websites, interfaces, and
        chatbots shaped with <em>restraint</em>, atmosphere, and intent.
      </p>
    </section>
  )
}
