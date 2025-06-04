import { useState } from "react"

export const useVideoReady = () => {
  const [ready, setReady] = useState(false)

  const handleCanPlay = () => {
    setReady(true)
  }

  return { ready, handleCanPlay }
}
