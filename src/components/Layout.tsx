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
import { MorphingShape } from './MorphingShape'
import { Navigation } from './Navigation'
import { PageProgress } from './PageProgress'
import { RouteVeil } from './RouteVeil'
import { StarField } from './StarField'

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
        <StarField />
        <div className="atmosphere-layer">
          <MorphingShape top="-5%" left="-5%" size="30rem" color="rgba(107, 76, 255, 0.08)" rotate={30} duration={18} delay={0} />
          <MorphingShape top="40%" right="-8%" size="25rem" color="rgba(196, 181, 160, 0.06)" rotate={-20} duration={22} delay={3} />
          <MorphingShape bottom="-5%" left="30%" size="20rem" color="rgba(107, 76, 255, 0.05)" rotate={60} duration={15} delay={1} />
        </div>
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
