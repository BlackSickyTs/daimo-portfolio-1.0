import { tools } from '../data/site'

export function Tools() {
  const loop = [...tools, ...tools]

  return (
    <section className="section" aria-label="The tools">
      <div className="section-head">
        <span className="section-index">07 — Material</span>
        <span className="kicker">The tools</span>
      </div>
      <div className="tools-track">
        <div className="tools-row">
          {loop.map((tool, index) => (
            <span key={`${tool}-${index}`}>{tool}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
