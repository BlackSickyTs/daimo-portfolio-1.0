import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  tilt?: number
  glow?: string
}

export function Card3D({ children, className = '', tilt = 15, glow = 'rgba(107, 76, 255, 0.15)' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mouseEnter, setMouseEnter] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el || !mouseEnter) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(el, {
        rotateY: x * tilt,
        rotateX: -y * tilt,
        duration: 0.6,
        ease: 'power3.out',
        transformPerspective: 1000,
      })

      gsap.to(el, {
        boxShadow: `0 20px 60px -20px ${glow}, 0 0 0 1px rgba(107, 76, 255, 0.1)`,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    const handleLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
        transformPerspective: 1000,
      })
      gsap.to(el, {
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [mouseEnter, tilt, glow])

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseEnter={() => setMouseEnter(true)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {children}
    </div>
  )
}
