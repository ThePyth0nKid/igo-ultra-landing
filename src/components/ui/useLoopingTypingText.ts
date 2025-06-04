import { useEffect, useState } from "react"

export const useLoopingTypingText = (
  text: string,
  speed = 60,
  pause = 2000
) => {
  const [displayed, setDisplayed] = useState("")
  const [index, setIndex] = useState(0)
  const [forward, setForward] = useState(true)

  useEffect(() => {
    const typing = () => {
      if (forward) {
        const next = text.slice(0, index + 1)
        setDisplayed(next)
        setIndex(i => i + 1)
        if (index + 1 >= text.length) {
          setTimeout(() => setForward(false), pause)
        }
      } else {
        const next = text.slice(0, index - 1)
        setDisplayed(next)
        setIndex(i => i - 1)
        if (index - 1 <= 0) {
          setTimeout(() => setForward(true), pause)
        }
      }
    }

    const timer = setTimeout(typing, speed)
    return () => clearTimeout(timer)
  }, [index, forward, text, speed, pause])

  return displayed
}
