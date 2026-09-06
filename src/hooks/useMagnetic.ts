import { useEffect, type RefObject } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion'

export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.28) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !isFinePointer()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      xTo((event.clientX - rect.left - rect.width / 2) * strength)
      yTo((event.clientY - rect.top - rect.height / 2) * strength)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [ref, strength])
}
