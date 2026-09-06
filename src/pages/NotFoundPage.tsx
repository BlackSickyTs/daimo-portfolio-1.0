import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="missing">
      <div>
        <p className="kicker">404</p>
        <h1 className="project-title">Lost in the atmosphere.</h1>
        <p className="about-copy">This path is not part of the work.</p>
        <Link className="explore" to="/" data-cursor="HOME">
          Return <i aria-hidden="true">→</i>
        </Link>
      </div>
    </section>
  )
}
