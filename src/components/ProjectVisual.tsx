type Props = {
  variant: 'a' | 'b' | 'c' | 'd'
  title: string
}

export function ProjectVisual({ variant, title }: Props) {
  return (
    <div className="visual" aria-hidden="true">
      <div className={`visual-inner visual-${variant}`} title={title} />
    </div>
  )
}
