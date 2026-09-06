import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteContext } from '../context/SiteContext'
import { useLenis } from '../hooks/useLenis'
import { ScrollTrigger } from '../lib/motion'
import { Cursor } from './Cursor'
import { Footer } from './Footer'
import { Grain } from './Grain'
import { HashScroller } from './HashScroller'
import { Loader } from './Loader'
import { Navigation } from './Navigation'
import { PageProgress } from './PageProgress'
import { RouteVeil } from './RouteVeil'

export function Layout() {
  const [ready, setReady] = useState(false)
  const location = useLocation()
  useLenis()

  const onLoaded = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (!ready) return
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [ready, location.pathname])

  return (
    <SiteContext.Provider value={{ ready }}>
      <div className="site">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Grain />
        <Cursor />
        <PageProgress />
        <RouteVeil />
        <HashScroller />
        {!ready ? <Loader onDone={onLoaded} /> : null}
        <Navigation />
        <main id="content" key={location.pathname}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </SiteContext.Provider>
  )
}
