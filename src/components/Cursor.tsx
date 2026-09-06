import { useEffect, useRef } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return

    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return

    document.body.classList.add('has-custom-cursor')

    const xDot = gsap.quickTo(dotEl, 'x', { duration: 0.16, ease: 'power3.out' })
    const yDot = gsap.quickTo(dotEl, 'y', { duration: 0.16, ease: 'power3.out' })
    const xRing = gsap.quickTo(ringEl, 'x', { duration: 0.38, ease: 'power3.out' })
    const yRing = gsap.quickTo(ringEl, 'y', { duration: 0.38, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      xDot(event.clientX)
      yDot(event.clientY)
      xRing(event.clientX)
      yRing(event.clientY)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const interactive = target.closest('[data-cursor], a, button')
      if (!interactive) {
        ringEl.textContent = ''
        ringEl.classList.remove('is-hover', 'is-view')
        return
      }
      const label = interactive.getAttribute('data-cursor') ?? ''
      ringEl.textContent = label
      ringEl.classList.toggle('is-view', Boolean(label))
      ringEl.classList.toggle('is-hover', !label)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
