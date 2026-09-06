import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'

export function PageProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bar.current
    if (!el || prefersReducedMotion()) return

    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      },
    )

    return () => {
      tween.kill()
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === document.documentElement)
        .forEach((trigger) => trigger.kill())
    }
  }, [])

  return <div ref={bar} className="progress" aria-hidden="true" />
}
