import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

const STAR_COUNT = 200

interface Star {
  x: number
  y: number
  z: number
  size: number
  opacity: number
  speed: number
}

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return

    const container = containerRef.current
    const stars: Star[] = []

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.5 + 0.1,
      })
    }
    starsRef.current = stars

    const ctx = gsap.context(() => {
      stars.forEach((star) => {
        const el = container.children[stars.indexOf(star)] as HTMLElement
        if (!el) return
        gsap.to(el, {
          y: `-${star.speed * 100}`,
          duration: star.speed * 8 + 4,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
        gsap.to(el, {
          opacity: star.opacity + 0.3,
          duration: star.speed * 3 + 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="star-field"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      {starsRef.current.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: 'rgba(237, 234, 228, 0.8)',
            opacity: star.opacity,
            transform: `translateZ(${star.z}px)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
