import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ExploreLink } from '../components/ExploreLink'
import { ProjectVisual } from '../components/ProjectVisual'
import { Card3D } from '../components/Card3D'
import { projects } from '../data/site'
import { gsap, prefersReducedMotion } from '../lib/motion'

const variants = ['a', 'b', 'c', 'd'] as const

export function Work() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project').forEach((project, index) => {
        const visual = project.querySelector('.visual')
        gsap.from(project.querySelector('.project-copy'), {
          opacity: 0,
          y: 28,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 82%',
          },
          delay: index * 0.1,
        })
        if (visual) {
          gsap.fromTo(
            visual,
            { clipPath: 'inset(100% 0 0 0)', rotateY: -15 },
            {
              clipPath: 'inset(0% 0 0 0)',
              rotateY: 0,
              duration: 1.1,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: project,
                start: 'top 80%',
              },
            },
          )
        }
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={root} className="section">
      <div className="section-head">
        <span className="section-index">02 — Selected</span>
        <span className="kicker">Work</span>
      </div>
      <div className="work-list">
        {projects.map((project, index) => (
          <Card3D key={project.slug} className={`project is-${project.layout}`} tilt={12} glow="rgba(107, 76, 255, 0.12)">
            <div className="project-copy">
              <span className="meta">
                {project.number} / {project.year}
              </span>
              <h2 className="project-title">
                <Link to={`/work/${project.slug}`}>{project.title}</Link>
              </h2>
              <p className="project-excerpt">{project.excerpt}</p>
              <div className="project-meta-row">
                {project.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <ExploreLink to={`/work/${project.slug}`}>Explore project</ExploreLink>
            </div>
            <Link
              to={`/work/${project.slug}`}
              className="project-visual-link"
              data-cursor="VIEW"
              aria-label={`Open ${project.title}`}
            >
              <ProjectVisual variant={variants[index] ?? 'a'} title={project.title} />
            </Link>
          </Card3D>
        ))}
      </div>
    </section>
  )
}
