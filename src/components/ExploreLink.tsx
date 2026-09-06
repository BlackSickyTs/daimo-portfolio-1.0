import { Link } from 'react-router-dom'

type Props = {
  to: string
  children: string
  cursor?: string
}

export function ExploreLink({ to, children, cursor = 'OPEN' }: Props) {
  return (
    <Link to={to} className="explore" data-cursor={cursor}>
      {children} <i aria-hidden="true">→</i>
    </Link>
  )
}
