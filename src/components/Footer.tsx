import { Link } from 'react-router-dom'
import { navItems, site } from '../data/site'

export function Footer() {
  return (
    <footer className="footer">
      <div>
        {site.name}
        <br />
        {site.role}
      </div>
      <nav aria-label="Footer">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="footer-copy">© {site.year} {site.name}</div>
    </footer>
  )
}
