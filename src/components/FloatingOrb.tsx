import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

interface FloatingOrbProps {
  top?: string
  left?: string
  size?: string
  color?: string
  blur?: string
  floatX?: number
  floatY?: number
  duration?: number
  delay?: number
  className?: string
}

export function FloatingOrb({
  top = '0',
  left = '0',
  size = '15rem',
  color = 'rgba(107, 76, 255, 0.08)',
  blur = '80px',
  floatX = 30,
  floatY = 20,
  duration = 12,
  delay = 0,
  className = '',
}: FloatingOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!orbRef.current || prefersReducedMotion()) return

    const el = orbRef.current
    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: floatX,
        y: floatY,
        duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay,
      })
      gsap.to(el, {
        opacity: 0.6,
        duration: duration * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: delay + duration * 0.25,
      })
    }, el)

    return () => ctx.revert()
  }, [floatX, floatY, duration, delay])

  return (
    <div
      ref={orbRef}
      className={`floating-orb ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: `blur(${blur})`,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    />
  )
}
