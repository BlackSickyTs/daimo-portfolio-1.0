import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../hooks/useLenis'
import { prefersReducedMotion } from '../lib/motion'

export function HashScroller() {
  const location = useLocation()

  useEffect(() => {
    const instant = prefersReducedMotion()
    const lenis = getLenis()

    if (!location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(location.hash.slice(1))
    const target = document.getElementById(id)
    if (!target) return

    const timer = window.setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(target, { immediate: instant, offset: -8 })
        return
      }
      target.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' })
    }, 50)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return null
}
