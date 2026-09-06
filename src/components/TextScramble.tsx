import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion, splitChars } from '../lib/motion'

interface TextScrambleProps {
  text: string
  className?: string
  element?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  delay?: number
  duration?: number
  stagger?: number
  reveal?: boolean
}

const SCRAMBLE_CHARS = '!@#$%^&*<>?/.,;:_+-=~`|\\[]{}\'\"'

export function TextScramble({
  text,
  className = '',
  element = 'div',
  delay = 0,
  duration = 1.2,
  stagger = 0.04,
  reveal = true,
}: TextScrambleProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return

    const originalText = el.textContent ?? ''
    const chars = splitChars(el)

    const ctx = gsap.context(() => {
      if (!reveal) return

      gsap.set(chars, { opacity: 0, yPercent: 120, rotateX: -90, scale: 0.3 })

      gsap.to(chars, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        scale: 1,
        duration: duration * 0.6,
        stagger: stagger,
        ease: 'back.out(2.5)',
        delay: delay * 0.01,
      })
    }, el)

    return () => ctx.revert()
  }, [text, delay, duration, stagger, reveal])

  const Element = element as string
  return (
    <Element ref={rootRef} className={`text-scramble ${className}`}>
      {text}
    </Element>
  )
}
