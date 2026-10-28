import React, { useMemo } from 'react'
import type { FloatingEmojiItem } from '../types'

interface FloatingEmojisProps {
  isVisible: boolean
}

const EMOJI_LIST = ['❤️', '💕', '💗', '💖', '💘', '💝', '🥰', '😘', '💋', '🫶', '💞']

export const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ isVisible }) => {
  // Generate a fixed, beautifully distributed set of faded emojis
  const emojis: FloatingEmojiItem[] = useMemo(() => {
    // 36 emojis scattered naturally across the canvas
    const rawCoords = [
      // Top Left quadrant
      { top: 5, left: 6, size: 24, opacity: 0.12, blur: 0, dur: 18, delay: -2, drift: 'A' },
      { top: 12, left: 18, size: 36, opacity: 0.16, blur: 1.5, dur: 22, delay: -7, drift: 'B' },
      { top: 22, left: 8, size: 20, opacity: 0.09, blur: 0, dur: 19, delay: -4, drift: 'C' },
      { top: 28, left: 24, size: 30, opacity: 0.14, blur: 1, dur: 25, delay: -11, drift: 'A' },
      { top: 18, left: 32, size: 22, opacity: 0.1, blur: 0, dur: 20, delay: -5, drift: 'B' },

      // Top Right quadrant
      { top: 6, left: 82, size: 28, opacity: 0.13, blur: 0, dur: 21, delay: -3, drift: 'C' },
      { top: 14, left: 68, size: 40, opacity: 0.17, blur: 2, dur: 26, delay: -9, drift: 'A' },
      { top: 22, left: 90, size: 18, opacity: 0.08, blur: 0, dur: 17, delay: -1, drift: 'B' },
      { top: 26, left: 76, size: 32, opacity: 0.15, blur: 1.5, dur: 23, delay: -13, drift: 'C' },
      { top: 10, left: 52, size: 24, opacity: 0.11, blur: 0, dur: 24, delay: -6, drift: 'A' },

      // Middle Sides (leaving central 35%-65% width and 38%-62% height unobstructed)
      { top: 40, left: 5, size: 34, opacity: 0.14, blur: 1, dur: 22, delay: -8, drift: 'B' },
      { top: 48, left: 16, size: 22, opacity: 0.1, blur: 0, dur: 18, delay: -12, drift: 'A' },
      { top: 58, left: 7, size: 28, opacity: 0.12, blur: 0, dur: 20, delay: -4, drift: 'C' },
      { top: 38, left: 92, size: 26, opacity: 0.11, blur: 0, dur: 21, delay: -10, drift: 'B' },
      { top: 46, left: 84, size: 38, opacity: 0.16, blur: 2, dur: 27, delay: -15, drift: 'A' },
      { top: 56, left: 94, size: 20, opacity: 0.09, blur: 0, dur: 19, delay: -5, drift: 'C' },

      // Bottom Left quadrant
      { top: 68, left: 12, size: 32, opacity: 0.15, blur: 1.5, dur: 23, delay: -7, drift: 'A' },
      { top: 76, left: 25, size: 22, opacity: 0.1, blur: 0, dur: 18, delay: -11, drift: 'B' },
      { top: 84, left: 8, size: 38, opacity: 0.17, blur: 2, dur: 28, delay: -3, drift: 'C' },
      { top: 90, left: 22, size: 26, opacity: 0.12, blur: 0, dur: 20, delay: -9, drift: 'A' },
      { top: 72, left: 4, size: 18, opacity: 0.08, blur: 0, dur: 16, delay: -2, drift: 'B' },

      // Bottom Right quadrant
      { top: 66, left: 86, size: 30, opacity: 0.14, blur: 1, dur: 24, delay: -6, drift: 'C' },
      { top: 74, left: 72, size: 24, opacity: 0.11, blur: 0, dur: 19, delay: -14, drift: 'A' },
      { top: 82, left: 91, size: 36, opacity: 0.16, blur: 2, dur: 27, delay: -8, drift: 'B' },
      { top: 88, left: 78, size: 20, opacity: 0.09, blur: 0, dur: 17, delay: -12, drift: 'C' },
      { top: 92, left: 62, size: 28, opacity: 0.13, blur: 0, dur: 22, delay: -4, drift: 'A' },

      // Upper & Lower center accents (outside heading area)
      { top: 6, left: 38, size: 22, opacity: 0.1, blur: 0, dur: 21, delay: -5, drift: 'B' },
      { top: 12, left: 46, size: 26, opacity: 0.12, blur: 1, dur: 25, delay: -10, drift: 'C' },
      { top: 86, left: 36, size: 32, opacity: 0.15, blur: 1.5, dur: 26, delay: -7, drift: 'A' },
      { top: 92, left: 48, size: 24, opacity: 0.11, blur: 0, dur: 20, delay: -2, drift: 'B' },
      { top: 78, left: 54, size: 20, opacity: 0.09, blur: 0, dur: 18, delay: -13, drift: 'C' },
    ]

    return rawCoords.map((item, index) => ({
      id: index,
      emoji: EMOJI_LIST[index % EMOJI_LIST.length],
      top: item.top,
      left: item.left,
      size: item.size,
      opacity: item.opacity,
      blur: item.blur,
      duration: item.dur,
      delay: item.delay,
      driftType: item.drift as 'A' | 'B' | 'C',
    }))
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 2.2s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      aria-hidden="true"
    >
      {emojis.map((item) => {
        const animationName =
          item.driftType === 'A'
            ? 'floatDriftA'
            : item.driftType === 'B'
            ? 'floatDriftB'
            : 'floatDriftC'

        return (
          <span
            key={item.id}
            style={{
              position: 'absolute',
              top: `${item.top}%`,
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              lineHeight: 1,
              opacity: item.opacity,
              filter: item.blur > 0 ? `blur(${item.blur}px)` : 'none',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
              animation: `${animationName} ${item.duration}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
              userSelect: 'none',
            }}
          >
            {item.emoji}
          </span>
        )
      })}
    </div>
  )
}
