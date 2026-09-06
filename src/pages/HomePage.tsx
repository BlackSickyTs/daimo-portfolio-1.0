import { About } from '../sections/About'
import { Chatbot } from '../sections/Chatbot'
import { Contact } from '../sections/Contact'
import { Experiments } from '../sections/Experiments'
import { Hero } from '../sections/Hero'
import { Manifesto } from '../sections/Manifesto'
import { Services } from '../sections/Services'
import { Tools } from '../sections/Tools'
import { Work } from '../sections/Work'

export function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Work />
      <Experiments />
      <Chatbot />
      <About />
      <Services />
      <Tools />
      <Contact />
    </>
  )
}
