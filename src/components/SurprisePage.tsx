import React, { useState, useMemo, useRef } from 'react'
import { birthdayLetter } from '../config/birthdayLetter'

interface SurprisePageProps {
  onBack: () => void
}

interface FloatingUpwardHeart {
  id: number
  left: number // 5% to 95%
  size: number // px
  duration: number // seconds
  delay: number // seconds
  opacity: number
}

const SURPRISE_EMOJIS = ['❤️', '💕', '💗', '💖', '💘', '💞', '🫶']

export const SurprisePage: React.FC<SurprisePageProps> = ({ onBack }) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showHeading, setShowHeading] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Floating background ambient emojis (8% - 18% opacity)
  const backgroundEmojis = useMemo(() => {
    const coords = [
      { top: 8, left: 8, size: 26, opacity: 0.12, dur: 22, delay: -3 },
      { top: 15, left: 88, size: 36, opacity: 0.16, dur: 26, delay: -8 },
      { top: 32, left: 12, size: 22, opacity: 0.1, dur: 19, delay: -5 },
      { top: 26, left: 84, size: 30, opacity: 0.14, dur: 24, delay: -12 },
      { top: 68, left: 9, size: 32, opacity: 0.15, dur: 23, delay: -7 },
      { top: 72, left: 91, size: 24, opacity: 0.11, dur: 20, delay: -14 },
      { top: 86, left: 16, size: 34, opacity: 0.16, dur: 27, delay: -2 },
      { top: 88, left: 84, size: 28, opacity: 0.13, dur: 21, delay: -9 },
      { top: 10, left: 50, size: 20, opacity: 0.1, dur: 20, delay: -6 },
      { top: 92, left: 50, size: 26, opacity: 0.12, dur: 22, delay: -15 },
    ]

    return coords.map((c, i) => ({
      id: i,
      emoji: SURPRISE_EMOJIS[i % SURPRISE_EMOJIS.length],
      ...c,
    }))
  }, [])

  // Floating upward hearts when surprise is revealed
  const upwardHearts: FloatingUpwardHeart[] = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: 8 + Math.random() * 84,
      size: 16 + Math.random() * 20,
      duration: 6.5 + Math.random() * 4,
      delay: Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.45,
    }))
  }, [])

  const handleReveal = () => {
    if (isRevealed) return
    setIsRevealed(true)

    // Smooth reveal animation sequence:
    // 1. Heading appears smoothly
    setTimeout(() => {
      setShowHeading(true)
    }, 450)

    // 2. Full letter content fades in
    setTimeout(() => {
      setShowLetter(true)
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
    }, 850)
  }

  const handleBackToSurprise = () => {
    setShowLetter(false)
    setShowHeading(false)
    setIsRevealed(false)
  }

  return (
    <div
      className={`surprise-page-container ${isRevealed ? 'is-revealed' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        overflow: 'hidden',
        animation: 'pageFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        background: `radial-gradient(
          circle at 50% 40%,
          #5A0010 0%,
          #3B0008 36%,
          #240006 72%,
          #150003 100%
        )`,
      }}
    >
      {/* Background Darkening Overlay when letter is revealed */}
      <div
        className="reveal-darken-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(16, 0, 3, 0.85) 0%, rgba(10, 0, 2, 0.96) 85%)',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: isRevealed ? 1 : 0,
          transition: 'opacity 1.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />

      {/* Subtle Background Corner Couple Photographs */}
      <div
        className="surprise-background-photos"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: isRevealed ? 0.12 : 0.3,
          transition: 'opacity 1.4s ease',
        }}
        aria-hidden="true"
      >
        <div className="bg-corner-photo top-left">
          <img src="/images/couple-1-hands.jpg" alt="" />
        </div>
        <div className="bg-corner-photo top-right">
          <img src="/images/couple-3-streetlights.jpg" alt="" />
        </div>
        <div className="bg-corner-photo bottom-left">
          <img src="/images/couple-2-embrace.jpg" alt="" />
        </div>
        <div className="bg-corner-photo bottom-right">
          <img src="/images/couple-4-sunset.jpg" alt="" />
        </div>
      </div>

      {/* Ambient Crimson Glow Halo */}
      <div
        className="surprise-ambient-glow"
        style={{
          position: 'absolute',
          top: '38%',
          left: '50%',
          width: '580px',
          height: '580px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 0, 43, 0.32) 0%, rgba(90, 0, 16, 0.12) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'all 1.4s ease',
          opacity: isRevealed ? 0.85 : 0.45,
        }}
      />

      {/* Back button */}
      <button
        onClick={isRevealed ? handleBackToSurprise : onBack}
        className="surprise-back-btn"
        aria-label={isRevealed ? 'Back to surprise prompt' : 'Return to birthday homepage'}
      >
        <span className="back-arrow">←</span>
        <span className="back-heart">♡</span>
      </button>

      {/* Faded background love emojis */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 3,
        }}
        aria-hidden="true"
      >
        {backgroundEmojis.map((e) => (
          <span
            key={e.id}
            style={{
              position: 'absolute',
              top: `${e.top}%`,
              left: `${e.left}%`,
              fontSize: `${e.size}px`,
              opacity: isRevealed ? e.opacity * 0.6 : e.opacity,
              lineHeight: 1,
              animation: `floatDriftA ${e.dur}s ease-in-out infinite`,
              animationDelay: `${e.delay}s`,
              willChange: 'transform',
              userSelect: 'none',
              transition: 'opacity 1.5s ease',
            }}
          >
            {e.emoji}
          </span>
        ))}
      </div>

      {/* Floating upward hearts when letter is revealed */}
      {isRevealed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 4,
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          {upwardHearts.map((h) => (
            <span
              key={h.id}
              style={{
                position: 'absolute',
                bottom: '-30px',
                left: `${h.left}%`,
                fontSize: `${h.size}px`,
                opacity: h.opacity,
                filter: 'drop-shadow(0 0 10px rgba(255, 77, 109, 0.8))',
                animation: `floatUpward ${h.duration}s ease-in forwards`,
                animationDelay: `${h.delay}s`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      {/* PRE-REVEAL STATE: Glowing Heart + "I have one last surprise for you ❤️" + Reveal Button */}
      {!isRevealed && (
        <div className="surprise-pre-reveal">
          {/* Glowing Center Heart */}
          <div className="center-glowing-heart">
            <svg
              width="80"
              height="80"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="heart-svg-glow"
            >
              <path
                d="M32 54C32 54 13 41.5 13 28.5C13 21.5 18.5 16 25.5 16C28.2 16 30.5 17 32 19C33.5 17 35.8 16 38.5 16C45.5 16 51 21.5 51 28.5C51 41.5 32 54 32 54Z"
                fill="url(#surpriseHeartGrad)"
                stroke="#C9002B"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="surpriseHeartGrad" x1="13" y1="16" x2="51" y2="54" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4D6D" />
                  <stop offset="0.5" stopColor="#C9002B" />
                  <stop offset="1" stopColor="#8B0018" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Under heart message */}
          <h2 className="surprise-lead-text">
            I have one last surprise for you <span className="heart-accent">❤️</span>
          </h2>

          {/* Reveal Button */}
          <button onClick={handleReveal} className="reveal-btn">
            <span>Reveal My Surprise 💗</span>
          </button>
        </div>
      )}

      {/* REVEALED STATE: Complete Birthday Love Letter Presentation */}
      {isRevealed && (
        <div
          ref={scrollContainerRef}
          className="letter-scroll-container"
        >
          <div className="letter-inner-wrapper">
            {/* Top Glowing Heart */}
            <div className="letter-top-heart">
              <span className="heart-icon-pulsing" aria-hidden="true">
                ❤️
              </span>
            </div>

            {/* Heading: "For my shonuuuuuu ❤️" */}
            <header className={`letter-header ${showHeading ? 'visible' : ''}`}>
              <h1 className="letter-title">{birthdayLetter.title}</h1>
              {birthdayLetter.subtitle && (
                <p className="letter-subtitle">{birthdayLetter.subtitle}</p>
              )}
              <div className="letter-divider" aria-hidden="true">
                <span>♡</span>
                <span className="divider-line" />
                <span>❤️</span>
                <span className="divider-line" />
                <span>♡</span>
              </div>
            </header>

            {/* Complete Letter Continuous Presentation */}
            <article className={`letter-parchment ${showLetter ? 'visible' : ''}`}>
              {birthdayLetter.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`letter-paragraph ${index === 0 ? 'first-paragraph' : ''} ${
                    index === birthdayLetter.paragraphs.length - 1 ? 'last-paragraph' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              {/* Decorative Closing Signature */}
              <div className="letter-footer">
                <div className="footer-hearts" aria-hidden="true">
                  <span>❤️</span> <span>💋</span> <span>💗</span> <span>🫂</span> <span>💕</span>
                </div>
                <p className="footer-signoff">Forever & always yours ❤️</p>

                {/* Return button at bottom of letter */}
                <button onClick={onBack} className="letter-return-btn">
                  <span>Back to Birthday Page ♡</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      )}

      <style>{`
        .surprise-back-btn {
          position: fixed;
          top: calc(env(safe-area-inset-top, 16px) + 16px);
          left: calc(env(safe-area-inset-left, 16px) + 18px);
          z-index: 50;
          background: rgba(59, 0, 8, 0.7);
          border: 1px solid rgba(201, 0, 43, 0.45);
          color: #FFF0F2;
          padding: 8px 16px;
          border-radius: 999px;
          font-family: var(--font-serif);
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.65);
          transition: all 0.3s ease;
        }

        .surprise-back-btn:hover {
          background: rgba(90, 0, 16, 0.9);
          border-color: #FF4D6D;
          transform: translateX(-3px);
          box-shadow: 0 0 20px rgba(201, 0, 43, 0.55);
        }

        .back-arrow {
          font-size: 1.25rem;
          line-height: 1;
        }

        .back-heart {
          font-size: 1.1rem;
          line-height: 1;
          color: #FF758F;
        }

        /* Ambient Corner Background Photos */
        .bg-corner-photo {
          position: absolute;
          border-radius: 20px;
          overflow: hidden;
          filter: contrast(1.05) saturate(1.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }
        .bg-corner-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .bg-corner-photo.top-left {
          top: 4%;
          left: 4%;
          width: 220px;
          height: 155px;
          transform: rotate(-3deg);
        }
        .bg-corner-photo.top-right {
          top: 4%;
          right: 4%;
          width: 220px;
          height: 155px;
          transform: rotate(3deg);
        }
        .bg-corner-photo.bottom-left {
          bottom: 4%;
          left: 4%;
          width: 230px;
          height: 160px;
          transform: rotate(2.5deg);
        }
        .bg-corner-photo.bottom-right {
          bottom: 4%;
          right: 4%;
          width: 230px;
          height: 160px;
          transform: rotate(-2.5deg);
        }

        @media (max-width: 900px) {
          .bg-corner-photo {
            display: none;
          }
        }

        /* Pre-Reveal Container */
        .surprise-pre-reveal {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          gap: 1.8rem;
          z-index: 10;
        }

        .center-glowing-heart {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(90, 0, 16, 0.4);
          border: 1px solid rgba(201, 0, 43, 0.35);
          box-shadow: 
            0 0 35px rgba(201, 0, 43, 0.4),
            0 0 70px rgba(139, 0, 24, 0.25);
          animation: surpriseHeartGlow 3.8s ease-in-out infinite;
        }

        .heart-svg-glow {
          filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.7));
        }

        .surprise-lead-text {
          font-family: var(--font-serif);
          font-size: clamp(1.7rem, 4.2vw, 2.75rem);
          font-style: italic;
          font-weight: 500;
          color: #FFF0F2;
          margin: 0;
          max-width: 600px;
          line-height: 1.25;
          text-shadow: 
            0 0 20px rgba(201, 0, 43, 0.45),
            0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .heart-accent {
          font-style: normal;
          display: inline-block;
          margin-left: 0.2em;
          filter: drop-shadow(0 0 12px rgba(255, 77, 109, 0.8));
        }

        .reveal-btn {
          background: linear-gradient(135deg, #A3001E 0%, #680013 100%);
          border: 1.5px solid rgba(255, 77, 109, 0.5);
          border-radius: 999px;
          padding: 1rem 2.4rem;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #FFF0F2;
          cursor: pointer;
          box-shadow: 
            0 10px 28px rgba(0, 0, 0, 0.7),
            0 0 25px rgba(201, 0, 43, 0.45);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .reveal-btn:hover {
          transform: translateY(-3px) scale(1.03);
          border-color: #FF85A1;
          box-shadow: 
            0 14px 34px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(255, 77, 109, 0.7);
        }

        .reveal-btn:active {
          transform: translateY(1px);
        }

        /* REVEALED LETTER STYLES */
        .letter-scroll-container {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          z-index: 10;
          padding: calc(env(safe-area-inset-top, 24px) + 40px) 1.25rem calc(env(safe-area-inset-bottom, 24px) + 60px);
          scroll-behavior: smooth;
        }

        .letter-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .letter-scroll-container::-webkit-scrollbar-track {
          background: rgba(36, 0, 6, 0.3);
        }
        .letter-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(201, 0, 43, 0.4);
          border-radius: 999px;
        }
        .letter-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 77, 109, 0.7);
        }

        .letter-inner-wrapper {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .letter-top-heart {
          font-size: 2.8rem;
          margin-bottom: 1rem;
          animation: romanticHeartbeat 4s ease-in-out infinite, surpriseHeartGlow 3.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 20px rgba(255, 77, 109, 0.85));
          user-select: none;
        }

        .heart-icon-pulsing {
          display: inline-block;
        }

        .letter-header {
          text-align: center;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .letter-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .letter-title {
          font-family: var(--font-serif);
          font-size: clamp(2.3rem, 6.2vw, 4rem);
          font-style: italic;
          font-weight: 600;
          color: #FFF0F2;
          margin: 0 0 0.5rem;
          letter-spacing: 0.02em;
          line-height: 1.2;
          animation: crimsonGlowPulse 5s ease-in-out infinite alternate;
        }

        .letter-subtitle {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-style: italic;
          color: #E8B4BC;
          margin: 0 0 1rem;
          letter-spacing: 0.03em;
          opacity: 0.9;
        }

        .letter-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #FF758F;
          font-size: 1.1rem;
          margin: 0.75rem auto 0;
          opacity: 0.8;
        }

        .divider-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201, 0, 43, 0.65), transparent);
        }

        .letter-parchment {
          width: 100%;
          background: rgba(36, 0, 6, 0.68);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 0, 43, 0.35);
          border-radius: 26px;
          padding: clamp(1.8rem, 5vw, 3.2rem);
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(139, 0, 24, 0.28),
            inset 0 0 30px rgba(59, 0, 8, 0.4);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .letter-parchment.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .letter-paragraph {
          font-family: var(--font-serif);
          font-size: clamp(1.1rem, 2.1vw, 1.28rem);
          font-weight: 400;
          line-height: 1.85;
          letter-spacing: 0.015em;
          color: #FFF5F7;
          margin-bottom: 2.1rem;
          text-align: left;
          word-break: normal;
          overflow-wrap: break-word;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        .letter-paragraph.first-paragraph {
          font-size: clamp(1.15rem, 2.3vw, 1.34rem);
          color: #FFFFFF;
          border-left: 2.5px solid rgba(255, 77, 109, 0.6);
          padding-left: 1.2rem;
          margin-top: 0.25rem;
        }

        .letter-paragraph.last-paragraph {
          margin-bottom: 2.5rem;
          color: #FFFFFF;
          font-weight: 500;
          text-shadow: 0 0 20px rgba(201, 0, 43, 0.4), 0 1px 6px rgba(0, 0, 0, 0.8);
        }

        .letter-footer {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(201, 0, 43, 0.3);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
        }

        .footer-hearts {
          font-size: 1.5rem;
          letter-spacing: 0.35rem;
          filter: drop-shadow(0 0 10px rgba(255, 77, 109, 0.7));
        }

        .footer-signoff {
          font-family: var(--font-handwritten), var(--font-serif), cursive;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #FFCCD7;
          margin: 0;
          text-shadow: 0 0 16px rgba(201, 0, 43, 0.5);
        }

        .letter-return-btn {
          margin-top: 1rem;
          background: linear-gradient(135deg, #8B0018 0%, #5A0010 100%);
          border: 1px solid rgba(255, 77, 109, 0.45);
          border-radius: 999px;
          padding: 0.85rem 2rem;
          font-family: var(--font-serif);
          font-size: 1.18rem;
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0.03em;
          color: #FFF0F2;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
          transition: all 0.3s ease;
        }

        .letter-return-btn:hover {
          transform: translateY(-2px);
          border-color: #FF85A1;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.75), 0 0 20px rgba(201, 0, 43, 0.5);
        }

        @media (max-width: 640px) {
          .letter-scroll-container {
            padding: calc(env(safe-area-inset-top, 16px) + 55px) 1rem calc(env(safe-area-inset-bottom, 16px) + 50px);
          }

          .letter-parchment {
            padding: 1.4rem 1.15rem;
            border-radius: 20px;
          }

          .letter-paragraph {
            font-size: 1.08rem;
            line-height: 1.8;
            margin-bottom: 1.65rem;
          }

          .letter-paragraph.first-paragraph {
            padding-left: 0.85rem;
            border-left-width: 2px;
          }
        }
      `}</style>
    </div>
  )
}
