import { createContext, useContext } from 'react'

type SiteContextValue = {
  ready: boolean
}

export const SiteContext = createContext<SiteContextValue>({ ready: false })

export function useSite() {
  return useContext(SiteContext)
}
