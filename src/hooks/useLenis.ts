import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const instance = new Lenis({
      duration: 1.12,
      smoothWheel: true,
      autoRaf: false,
      touchMultiplier: 1.05,
    })

    lenis = instance
    instance.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      instance.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      instance.destroy()
      if (lenis === instance) lenis = null
    }
  }, [])
}
