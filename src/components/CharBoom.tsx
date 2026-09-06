import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion, splitChars } from '../lib/motion'

interface CharBoomProps {
  text: string
  className?: string
  element?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  stagger?: number
  duration?: number
  yBoom?: number
  rotateBoom?: number
  scaleBoom?: number
  bounce?: boolean
}

export function CharBoom({
  text,
  className = '',
  element = 'div',
  stagger = 0.08,
  duration = 0.8,
  yBoom = 150,
  rotateBoom = 30,
  scaleBoom = 1.5,
  bounce = true,
}: CharBoomProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return

    const chars = splitChars(el)

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0 })

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration,
        stagger,
        ease: bounce ? 'elastic.out(1, 0.5)' : 'power3.out',
      })
    }, el)

    return () => ctx.revert()
  }, [text, stagger, duration, yBoom, rotateBoom, scaleBoom, bounce])

  const Element = element as string
  return (
    <Element ref={rootRef} className={`char-boom ${className}`}>
      {text}
    </Element>
  )
}
