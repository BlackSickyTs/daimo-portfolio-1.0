import { useRef, useState, type FormEvent } from 'react'
import { askDaimo, chatIntro, makeId, type ChatMessage } from '../data/chatbot'

const seed: ChatMessage[] = [
  {
    id: 'intro',
    role: 'assistant',
    text: chatIntro,
  },
]

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>(seed)
  const [pending, setPending] = useState(false)
  const log = useRef<HTMLDivElement>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const text = String(data.get('prompt') ?? '').trim()
    if (!text || pending) return
    form.reset()

    const user: ChatMessage = { id: makeId(), role: 'user', text }
    setMessages((current) => [...current, user])
    setPending(true)

    const reply = await askDaimo(text)
    setMessages((current) => [
      ...current,
      { id: makeId(), role: 'assistant', text: reply },
    ])
    setPending(false)
    requestAnimationFrame(() => {
      log.current?.scrollTo({ top: log.current.scrollHeight, behavior: 'smooth' })
    })
  }

  return (
    <section id="talk" className="section">
      <div className="chat">
        <div>
          <div className="section-head" style={{ marginBottom: '1.5rem' }}>
            <span className="section-index">04 — Voice</span>
            <span className="kicker">Talk to the work</span>
          </div>
          <h2 className="project-title" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}>
            Ask Daimo
          </h2>
          <p className="about-copy">
            A conversational surface, not a support bubble. Local replies for now — the seam for a
            real model is already in the data layer.
          </p>
        </div>
        <div className="chat-panel" aria-label="Ask Daimo chatbot">
          <div className="chat-head">
            <span>Studio assistant</span>
            <span className="dot" aria-hidden="true" />
          </div>
          <div ref={log} className="chat-log" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`bubble is-${message.role}`}>
                {message.text}
              </div>
            ))}
            {pending ? <div className="bubble is-assistant">Listening…</div> : null}
          </div>
          <form className="chat-form" onSubmit={onSubmit}>
            <input
              name="prompt"
              type="text"
              autoComplete="off"
              placeholder="Ask about the work"
              aria-label="Message"
            />
            <button type="submit" data-cursor="SEND">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
