import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function splitWords(el: HTMLElement) {
  const nodes = Array.from(el.childNodes)
  el.textContent = ''
  const words: HTMLElement[] = []

  nodes.forEach((node, nodeIndex) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const pieces = (node.textContent ?? '').trim().split(/\s+/).filter(Boolean)
      pieces.forEach((word, index) => {
        words.push(appendWord(el, word))
        if (index < pieces.length - 1) el.appendChild(document.createTextNode(' '))
      })
      return
    }

    if (node instanceof HTMLElement) {
      const wrap = document.createElement('span')
      wrap.className = 'word-wrap'
      const inner = node.cloneNode(true) as HTMLElement
      inner.classList.add('word')
      wrap.appendChild(inner)
      el.appendChild(wrap)
      words.push(inner)
      if (nodeIndex < nodes.length - 1) el.appendChild(document.createTextNode(' '))
    }
  })

  return words
}

export function splitChars(el: HTMLElement) {
  const nodes = Array.from(el.childNodes)
  el.textContent = ''
  const chars: HTMLElement[] = []

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? '').trim()
      text.split('').forEach((char, index) => {
        const span = document.createElement('span')
        span.className = 'char'
        span.textContent = char === ' ' ? '\u00A0' : char
        el.appendChild(span)
        chars.push(span)
        if (index < text.length - 1) {
          const space = document.createElement('span')
          space.className = 'char'
          space.textContent = '\u00A0'
          el.appendChild(space)
        }
      })
      return
    }

    if (node instanceof HTMLElement) {
      const wrap = document.createElement('span')
      wrap.className = 'word-wrap'
      const inner = node.cloneNode(true) as HTMLElement
      inner.classList.add('word')
      wrap.appendChild(inner)
      el.appendChild(wrap)
      chars.push(wrap)
    }
  })

  return chars
}

function appendWord(el: HTMLElement, word: string) {
  const wrap = document.createElement('span')
  wrap.className = 'word-wrap'
  const inner = document.createElement('span')
  inner.className = 'word'
  inner.textContent = word
  wrap.appendChild(inner)
  el.appendChild(wrap)
  return inner
}


