import React, { useEffect, useRef, useState } from "react"

interface TextScrambleProps {
  texts: string[]
  interval?: number // Time between text changes
  speed?: number // Animation speed factor
  className?: string
}

interface QueueItem {
  from: string
  to: string
  start: number
  end: number
  char?: string
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________"

const randomChar = () => {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  texts,
  interval = 2000,
  speed = 1,
  className = ""
}) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)
  const queueRef = useRef<QueueItem[]>([])
  const frameRef = useRef(0)
  const frameRequestRef = useRef<number | null>(null)
  const resolveRef = useRef<(() => void) | null>(null)
  const isAnimatingRef = useRef(false)

  // Update function - defined within component as it needs access to refs
  const update = () => {
    if (!elementRef.current) return

    let output = ""
    let complete = 0
    const queue = queueRef.current
    const frame = frameRef.current

    for (let i = 0; i < queue.length; i++) {
      const { from, to, start, end } = queue[i]
      let { char } = queue[i]

      if (frame >= end) {
        complete++
        output += to
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar()
          queue[i].char = char
        }

        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    elementRef.current.innerHTML = output

    if (complete === queue.length) {
      isAnimatingRef.current = false
      if (resolveRef.current) {
        resolveRef.current()
        resolveRef.current = null
      }
    } else {
      frameRef.current++
      frameRequestRef.current = requestAnimationFrame(update)
    }
  }

  // Set text function - defined within component as it needs access to refs and other functions
  const setText = (newText: string): Promise<void> => {
    if (!elementRef.current || isAnimatingRef.current) return Promise.resolve()

    isAnimatingRef.current = true
    const oldText = elementRef.current.innerText || ""
    const length = Math.max(oldText.length, newText.length)

    return new Promise<void>((resolve) => {
      resolveRef.current = resolve
      const queue: QueueItem[] = []

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ""
        const to = newText[i] || ""
        const start = Math.floor(Math.random() * 40) / speed
        const end = start + Math.floor(Math.random() * 40) / speed
        queue.push({ from, to, start, end })
      }

      queueRef.current = queue

      if (frameRequestRef.current) {
        cancelAnimationFrame(frameRequestRef.current)
      }

      frameRef.current = 0
      frameRequestRef.current = requestAnimationFrame(update)
    })
  }

  // Handle text rotation with useEffect
  useEffect(() => {
    if (texts.length === 0) return

    let timeoutId: NodeJS.Timeout

    const nextText = () => {
      const nextIndex = (currentIndex + 1) % texts.length

      setText(texts[currentIndex]).then(() => {
        timeoutId = setTimeout(() => {
          setCurrentIndex(nextIndex)
        }, interval)
      })
    }

    nextText()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (frameRequestRef.current) {
        cancelAnimationFrame(frameRequestRef.current)
        frameRequestRef.current = null
      }
    }
  }, [texts, currentIndex, interval, speed])

  // Initial text setup
  useEffect(() => {
    if (texts.length > 0 && elementRef.current) {
      setCurrentText(texts[0])
      elementRef.current.innerText = texts[0]
    }
  }, [texts])

  return (
    <div
      ref={elementRef}
      className={className}
      aria-live="polite"
      style={{
        position: "fixed",
        left: "5vw",
        bottom: "12vh",
        fontFamily: "monospace",
        color: "#ffffff",
        textShadow: "rgb(0, 255, 243) 0px 0px 2px",
        fontSize: "1.5rem",
        backgroundColor: "#000000a1",
        padding: "0 7px",
        borderRadius: "0.3rem",
        lineHeight: "2rem"
      }}>
      {currentText}
    </div>
  )
}
