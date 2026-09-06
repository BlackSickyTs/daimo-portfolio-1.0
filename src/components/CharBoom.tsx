import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion, splitChars } from '../lib/motion'

interface CharBoomProps {
  text: string
  className?: string
}

export function CharBoom({
  text,
  className = '',
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
        duration: 0.6,
        stagger: 0.08,
        ease: 'elastic.out(1, 0.5)',
      })
    }, el)

    return () => ctx.revert()
  }, [text])

  return (
    <div ref={rootRef} className={`char-boom ${className}`}>
      {text}
    </div>
  )
}
