import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../lib/motion'

export function RouteVeil() {
  const veil = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const first = useRef(true)

  useLayoutEffect(() => {
    const el = veil.current
    if (!el) return
    if (first.current) {
      first.current = false
      return
    }
    if (prefersReducedMotion()) return

    gsap.fromTo(
      el,
      { yPercent: 100 },
      {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      },
    )
  }, [location.pathname])

  return <div ref={veil} className="page-veil" aria-hidden="true" />
}
