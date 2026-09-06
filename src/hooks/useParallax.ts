import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'

export function useParallax(factor: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: `-${factor * 100}`,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, el)
  }, [factor])

  return ref
}

export function useParallaxScale(factor: number = 0.05) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scale: 1 + factor,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [factor])

  return ref
}
