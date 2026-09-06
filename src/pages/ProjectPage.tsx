import { Link, Navigate, useParams } from 'react-router-dom'
import { ProjectVisual } from '../components/ProjectVisual'
import { getNextProject, getProject, projects } from '../data/site'

const variants = ['a', 'b', 'c', 'd'] as const

export function ProjectPage() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return <Navigate to="/" replace />
  }

  const next = getNextProject(project.slug)
  const variantIndex = projects.findIndex((item) => item.slug === project.slug)
  const variant = variants[variantIndex] ?? 'a'

  return (
    <article className="project-page">
      <p className="hero-meta">
        <span>
          {project.number} / {project.year}
        </span>
        <span>{project.status}</span>
      </p>
      <h1 className="project-hero-title">{project.title}</h1>
      <ProjectVisual variant={variant} title={project.title} />
      <div className="project-body">
        <div className="facts">
          <div>
            <span>Services</span>
            <span>{project.services.join(' / ')}</span>
          </div>
          <div>
            <span>Tools</span>
            <span>{project.tools.join(' / ')}</span>
          </div>
          <div>
            <span>Year</span>
            <span>{project.year}</span>
          </div>
        </div>
        <div>
          <p>{project.description}</p>
          <p>
            Case material will replace this study. Keep the layout, swap the story, attach the real
            stills.
          </p>
        </div>
      </div>
      <div className="next-project">
        <span className="kicker">Next study</span>
        <Link to={`/work/${next.slug}`} data-cursor="NEXT">
          <strong>{next.title}</strong>
        </Link>
      </div>
    </article>
  )
}
