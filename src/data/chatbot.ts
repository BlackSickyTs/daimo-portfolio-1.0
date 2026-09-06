export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export const chatIntro =
  'Ask about the work, the process, or what Daimo builds. This is a local study of a conversational interface — swap the brain later.'

const replies: Array<{ keys: string[]; answer: string }> = [
  {
    keys: ['who', 'daimo', 'you', 'about'],
    answer:
      'Daimo is a website developer who builds websites, interfaces, chatbots, and digital experiences. The portfolio itself is the argument.',
  },
  {
    keys: ['work', 'project', 'portfolio', 'signal', 'atelier', 'pulse', 'vessel'],
    answer:
      'Selected studies live in Work: Signal, Atelier, Pulse, and Vessel. They are placeholders for real case studies — replace the copy when the work is ready.',
  },
  {
    keys: ['service', 'offer', 'build', 'hire', 'available'],
    answer:
      'Web development, interfaces, chatbots, and interactive experiences. Daimo is available for select projects.',
  },
  {
    keys: ['chatbot', 'bot', 'ai', 'assistant'],
    answer:
      'Chatbots here are treated as designed objects. This panel is a local mock with a clean seam for a real model later.',
  },
  {
    keys: ['tech', 'stack', 'tool', 'react', 'code'],
    answer:
      'The tools field is meant to stay honest. Edit src/data/site.ts when you want specific technologies named.',
  },
  {
    keys: ['contact', 'email', 'start', 'project'],
    answer:
      'Start at the contact section. The email is a placeholder — replace hello@daimo when you are ready.',
  },
  {
    keys: ['process', 'how'],
    answer:
      'Look first. Shape the identity. Then build the motion, the interface, and the words so they feel like one object.',
  },
]

export async function askDaimo(prompt: string): Promise<string> {
  const query = prompt.toLowerCase()
  await wait(420 + Math.random() * 380)
  const hit = replies.find((entry) => entry.keys.some((key) => query.includes(key)))
  if (hit) return hit.answer
  return 'I can talk about Daimo, the studies, services, chatbots, or how to start a project. Ask again from another angle.'
}

export function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}
