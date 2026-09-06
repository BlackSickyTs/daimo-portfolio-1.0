import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion, splitWords } from '../lib/motion'

interface ScrollRevealTextProps {
  text: string
  className?: string
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  stagger?: number
  duration?: number
  yOffset?: number
  rotate?: number
  scale?: number
  ease?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | '360'
}

export function ScrollRevealText({
  text,
  className = '',
  element = 'div',
  stagger = 0.06,
  duration = 1.0,
  yOffset = 80,
  rotate = 0,
  scale = 1,
  ease = 'power3.out',
  delay = 0,
  direction = 'up',
}: ScrollRevealTextProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return

    const words = splitWords(el)

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0 })

      const fromVars: gsap.TweenVars = { opacity: 0 }
      switch (direction) {
        case 'up':
          fromVars.y = yOffset
          fromVars.rotateX = -15
          break
        case 'left':
          fromVars.x = -yOffset
          fromVars.rotateY = -15
          break
        case 'right':
          fromVars.x = yOffset
          fromVars.rotateY = 15
          break
        case '360':
          fromVars.rotateY = 180
          fromVars.scale = 0.5
          break
      }

      gsap.fromTo(
        words,
        fromVars,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration,
          ease,
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [text, stagger, duration, yOffset, rotate, scale, ease, delay, direction])

  const Element = element as string
  return (
    <Element ref={rootRef} className={`scroll-reveal-text ${className}`}>
      {text}
    </Element>
  )
}
