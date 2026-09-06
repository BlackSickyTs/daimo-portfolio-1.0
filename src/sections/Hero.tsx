import { useLayoutEffect, useRef } from 'react'
import { useSite } from '../context/SiteContext'
import { site } from '../data/site'
import { useMagnetic } from '../hooks/useMagnetic'
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion'

const lines = [
  { text: 'I Build', className: '' },
  { text: 'Digital', className: 'line-2' },
  { text: 'Experiences.', className: 'line-3' },
]

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLAnchorElement>(null)
  const depth1 = useRef<HTMLDivElement>(null)
  const depth2 = useRef<HTMLDivElement>(null)
  const { ready } = useSite()
  useMagnetic(hint, 0.22)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || !ready) return

    const titleLines = el.querySelectorAll<HTMLElement>('.hero-line')
    const chars = el.querySelectorAll<HTMLElement>('.hero-title .char')
    const reduced = prefersReducedMotion()
    const glowEl = glow.current
    const d1 = depth1.current
    const d2 = depth2.current

    const ctx = gsap.context(() => {
      if (glowEl) {
        gsap.set(glowEl, { x: window.innerWidth * 0.72, y: window.innerHeight * 0.38 })
      }

      if (reduced) return

      gsap.from(chars, {
        yPercent: 118,
        rotateX: -28,
        opacity: 0,
        duration: 1.05,
        stagger: 0.016,
        ease: 'expo.out',
      })

      gsap.from('.hero-meta, .hero-foot', {
        opacity: 0,
        y: 18,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.28,
      })

      if (d1) {
        gsap.from(d1, {
          opacity: 0,
          scale: 0.5,
          rotateZ: -30,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.4,
        })
      }
      if (d2) {
        gsap.from(d2, {
          opacity: 0,
          scale: 0.5,
          rotateZ: 30,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.6,
        })
      }
    }, el)

    const onMove = (event: PointerEvent) => {
      if (!glowEl || !isFinePointer()) return
      gsap.to(glowEl, {
        x: event.clientX,
        y: event.clientY,
        duration: 1.15,
        ease: 'power3.out',
      })
      gsap.to(titleLines, {
        x: (event.clientX / window.innerWidth - 0.5) * 16,
        y: (event.clientY / window.innerHeight - 0.5) * 8,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.05,
      })
      if (d1) {
        gsap.to(d1, {
          x: (event.clientX / window.innerWidth - 0.5) * -30,
          y: (event.clientY / window.innerHeight - 0.5) * -20,
          duration: 2,
          ease: 'power2.out',
        })
      }
      if (d2) {
        gsap.to(d2, {
          x: (event.clientX / window.innerWidth - 0.5) * 20,
          y: (event.clientY / window.innerHeight - 0.5) * 15,
          duration: 2,
          ease: 'power2.out',
        })
      }
    }

    if (!reduced && isFinePointer()) {
      window.addEventListener('pointermove', onMove)
    }

    return () => {
      window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [ready])

  return (
    <section ref={root} className="hero" aria-label="Introduction">
      <div ref={glow} className="hero-glow" aria-hidden="true" />
      <div ref={depth1} className="hero-depth-1" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
      </div>
      <div ref={depth2} className="hero-depth-2" aria-hidden="true">
        <div className="hero-orb hero-orb-2" />
      </div>
      <p className="hero-meta">
        <span>{site.meta}</span>
        <span>{site.year}</span>
      </p>
      <h1 className="hero-title">
        {lines.map((line) => (
          <span key={line.text} className={`hero-line ${line.className}`.trim()}>
            {[...line.text].map((char, index) => (
              <span key={`${line.text}-${index}`} className="char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
      </h1>
      <div className="hero-foot">
        <p className="hero-disciplines">{site.disciplines.join(' · ')}</p>
        <a ref={hint} className="scroll-hint" href="#manifesto">
          Scroll to explore
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
