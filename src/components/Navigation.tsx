import { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, site } from '../data/site'

export function Navigation() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="nav">
        <Link to="/" className="nav-brand" data-cursor="HOME">
          {site.name}
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className={`nav-toggle${open ? ' is-open' : ''}`}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
      </header>
      <div id={menuId} className={`menu${open ? ' is-open' : ''}`}>
        <ul className="menu-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link to={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
