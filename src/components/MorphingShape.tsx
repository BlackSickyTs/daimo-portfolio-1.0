import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

interface MorphingShapeProps {
  top?: string
  left?: string
  right?: string
  bottom?: string
  size?: string
  color?: string
  rotate?: number
  delay?: number
  duration?: number
  className?: string
}

export function MorphingShape({
  top = '0',
  left = '0',
  right = 'auto',
  bottom = 'auto',
  size = '20rem',
  color = 'rgba(107, 76, 255, 0.06)',
  rotate = 45,
  delay = 0,
  duration = 20,
  className = '',
}: MorphingShapeProps) {
  const shapeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!shapeRef.current || prefersReducedMotion()) return

    const el = shapeRef.current
    const ctx = gsap.context(() => {
      gsap.to(el, {
        rotation: rotate + 180,
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        duration: duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: delay,
      })
      gsap.to(el, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        duration: duration * 0.7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: delay + 1,
      })
    }, el)

    return () => ctx.revert()
  }, [rotate, duration, delay])

  return (
    <div
      ref={shapeRef}
      className={`morphing-shape ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        right: right === 'auto' ? undefined : right,
        bottom: bottom === 'auto' ? undefined : bottom,
        width: size,
        height: size,
        background: color,
        filter: 'blur(80px)',
        transform: `rotate(${rotate}deg)`,
        borderRadius: '40% 60% 70% 30% / 60% 40% 60% 50%',
        willChange: 'transform, border-radius',
        pointerEvents: 'none',
      }}
    />
  )
}
