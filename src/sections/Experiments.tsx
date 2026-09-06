import { useEffect, useRef } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion'

export function Experiments() {
  const field = useRef<HTMLDivElement>(null)
  const orb = useRef<HTMLDivElement>(null)
  const wave = useRef<SVGPathElement>(null)

  useEffect(() => {
    const node = field.current
    if (!node || !isFinePointer() || prefersReducedMotion()) return

    const items = node.querySelectorAll<HTMLElement>('.field-type')
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      items.forEach((item, index) => {
        gsap.to(item, {
          x: x * (28 + index * 18),
          y: y * (18 + index * 10),
          rotate: x * 6,
          duration: 0.8,
          ease: 'power3.out',
        })
      })
    }

    node.addEventListener('pointermove', onMove)
    return () => node.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const node = orb.current
    if (!node || !isFinePointer() || prefersReducedMotion()) return
    const parent = node.parentElement
    if (!parent) return

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      gsap.to(node, {
        x: event.clientX - rect.left - 96,
        y: event.clientY - rect.top - 96,
        duration: 0.9,
        ease: 'power3.out',
      })
    }

    parent.addEventListener('pointermove', onMove)
    return () => parent.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const path = wave.current
    if (!path || prefersReducedMotion()) {
      path?.setAttribute('d', 'M 0 70 L 560 70')
      return
    }

    let frame = 0
    let raf = 0
    const draw = () => {
      frame += 0.045
      const d = Array.from({ length: 24 }, (_, i) => {
        const x = (i / 23) * 560
        const y = 70 + Math.sin(i * 0.5 + frame) * 22 + Math.sin(i * 0.2 + frame * 0.6) * 8
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      }).join(' ')
      path.setAttribute('d', d)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="experiments" className="section experiments">
      <div className="section-head">
        <span className="section-index">03 — Studio</span>
        <span className="kicker">Experiments</span>
      </div>
      <div className="exp-grid">
        <div className="exp-cell" ref={field}>
          <span className="exp-label">01 / Generative type</span>
          <div className="field" aria-hidden="true">
            <span className="field-type" style={{ top: '18%', left: '8%' }}>
              FORM
            </span>
            <span className="field-type" style={{ top: '46%', left: '28%' }}>
              SIGNAL
            </span>
            <span className="field-type" style={{ top: '68%', left: '6%' }}>
              ROOM
            </span>
          </div>
        </div>
        <div className="exp-cell">
          <span className="exp-label">02 / Light field</span>
          <div ref={orb} className="orb" aria-hidden="true" />
        </div>
        <div className="exp-cell">
          <span className="exp-label">03 / Waveform</span>
          <svg className="wave" viewBox="0 0 560 140" aria-hidden="true">
            <path
              ref={wave}
              fill="none"
              stroke="rgba(237,234,228,0.55)"
              strokeWidth="1.4"
            />
          </svg>
        </div>
        <div className="exp-cell">
          <span className="exp-label">04 / Distortion</span>
          <Distortion />
        </div>
      </div>
    </section>
  )
}

function Distortion() {
  const text = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = text.current
    if (!el || !isFinePointer() || prefersReducedMotion()) return
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18
      gsap.to(el, {
        skewX: x * 0.4,
        letterSpacing: `${-0.06 + Math.abs(x) * 0.004}em`,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
    const parent = el.parentElement
    parent?.addEventListener('pointermove', onMove)
    return () => parent?.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={text}
      className="field-type"
      style={{ position: 'absolute', inset: 'auto 8% 18%', fontSize: 'clamp(2.4rem, 6vw, 4.4rem)' }}
    >
      DAIMO
    </div>
  )
}
