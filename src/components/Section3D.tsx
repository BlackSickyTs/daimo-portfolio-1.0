import { useRef, ReactNode } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'

interface Section3DProps {
  children: ReactNode
  className?: string
  reveal?: 'up' | 'left' | 'right' | '360' | 'flip'
  stagger?: boolean
  duration?: number
}

export function Section3D({ children, className = '', reveal = 'up', stagger = false, duration = 1.0 }: Section3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return

    const children = el.children
    const items = stagger ? Array.from(children) : [el]

    const ctx = gsap.context(() => {
      const baseVars: gsap.TweenVars = {
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      }

      if (stagger) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 80, rotateX: -20, rotateY: 20 },
          { opacity: 1, y: 0, rotateX: 0, rotateY: 0, stagger: 0.15, ...baseVars }
        )
      } else {
        const fromVars: gsap.TweenVars = { opacity: 0 }
        switch (reveal) {
          case 'up':
            fromVars.y = 80
            fromVars.rotateX = -15
            break
          case 'left':
            fromVars.x = -80
            fromVars.rotateY = -15
            break
          case 'right':
            fromVars.x = 80
            fromVars.rotateY = 15
            break
          case '360':
            fromVars.rotateY = 180
            fromVars.scale = 0.7
            break
          case 'flip':
            fromVars.rotateX = 90
            fromVars.opacity = 0
            break
        }
        gsap.fromTo(items, fromVars, { ...baseVars })
      }
    }, el)

    return () => ctx.revert()
  }, [reveal, stagger, duration])

  return (
    <div ref={rootRef} className={`section-3d ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}
