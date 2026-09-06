import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

type Props = {
  onDone: () => void
}

export function Loader({ onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion()
    if (reduced) {
      onDone()
      return
    }

    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      onDone()
    }

    const fallback = window.setTimeout(finish, 2400)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish })
      tl.to('.loader-name', { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power4.inOut' })
        .to('.loader-bar span', { width: '100%', duration: 0.65, ease: 'power2.inOut' }, 0.08)
        .to(root.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', delay: 0.08 })
    }, root)

    return () => {
      window.clearTimeout(fallback)
      ctx.revert()
    }
  }, [onDone])

  return (
    <div ref={root} className="loader" role="status" aria-live="polite">
      <div className="loader-inner">
        <div className="loader-name">DAIMO</div>
        <div className="loader-meta">
          <span>Establishing atmosphere</span>
          <span>00 — 01</span>
        </div>
        <div className="loader-bar">
          <span />
        </div>
      </div>
    </div>
  )
}
