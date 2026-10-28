import React, { useState, useEffect } from 'react'

interface BirthdayHeroProps {
  isVisible: boolean
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ isVisible }) => {
  const [showSubMessage, setShowSubMessage] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setShowSubMessage(false)
      return
    }

    // Delay the sub-message fade-in so it gently appears after the main heading has appeared
    const timer = setTimeout(() => {
      setShowSubMessage(true)
    }, 1200)

    return () => clearTimeout(timer)
  }, [isVisible])

  return (
    <main
      className="birthday-hero-container"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 6,
        pointerEvents: 'none',
        padding: '1.5rem',
      }}
    >
      <div
        className={`birthday-heading-wrapper ${isVisible ? 'visible' : ''}`}
        style={{
          textAlign: 'center',
          maxWidth: 'min(900px, 92vw)',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Main Prominent Heading */}
        <h1 className="birthday-heading">
          <span className="text-words">Happy Birthday babygirl</span>{' '}
          <span className="heart-symbol" aria-hidden="true">
            ❤️
          </span>
        </h1>

        {/* Emotional Sub-Message Underneath */}
        <p className={`birthday-sub-message ${showSubMessage ? 'visible' : ''}`}>
          <span className="sub-message-text">
            I wish I could be there with you and celebrate your birthday, shonuuuuuu
          </span>{' '}
          <span className="sub-message-emojis" aria-hidden="true">
            🥺💔😔
          </span>
        </p>
      </div>

      <style>{`
        .birthday-heading-wrapper {
          opacity: 0;
          transform: scale(0.92);
          transition: 
            opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 2.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .birthday-heading-wrapper.visible {
          opacity: 1;
          transform: scale(1);
          animation: romanticHeartbeat 4.5s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .birthday-heading {
          margin: 0;
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 6.2vw, 5.2rem);
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0.02em;
          line-height: 1.18;
          color: var(--text-romantic);
          animation: crimsonGlowPulse 5s ease-in-out infinite alternate;
          white-space: normal;
          text-align: center;
        }

        .text-words {
          background: linear-gradient(
            180deg,
            #FFFFFF 0%,
            #FFF0F2 45%,
            #FFD6DC 85%,
            #FFB8C3 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7));
          display: inline;
        }

        .heart-symbol {
          display: inline-block;
          font-style: normal;
          margin-left: 0.2em;
          filter: drop-shadow(0 0 16px rgba(220, 20, 60, 0.85));
          transform-origin: center;
          transition: transform 0.3s ease;
        }

        /* Emotional Sub-Message under the heading */
        .birthday-sub-message {
          margin-top: clamp(1rem, 2.8vw, 1.8rem);
          margin-bottom: 0;
          font-family: 'Dancing Script', var(--font-handwritten), cursive;
          font-size: clamp(1.35rem, 3.4vw, 2.25rem);
          font-weight: 600;
          letter-spacing: 0.02em;
          line-height: 1.38;
          color: #FFBCC8;
          text-align: center;
          max-width: min(820px, 90vw);
          word-break: normal;
          overflow-wrap: break-word;
          opacity: 0;
          transform: translateY(14px);
          transition: 
            opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
          text-shadow: 
            0 0 18px rgba(255, 105, 135, 0.55),
            0 0 35px rgba(201, 0, 43, 0.35),
            0 2px 8px rgba(0, 0, 0, 0.85);
        }

        .birthday-sub-message.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .sub-message-text {
          background: linear-gradient(
            180deg,
            #FFF2F5 0%,
            #FFCCD6 45%,
            #FFA8BA 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline;
        }

        .sub-message-emojis {
          display: inline-block;
          margin-left: 0.25em;
          font-style: normal;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          filter: drop-shadow(0 0 10px rgba(255, 105, 135, 0.6));
        }

        @media (max-width: 640px) {
          .birthday-heading {
            font-size: clamp(1.95rem, 8.2vw, 2.65rem);
            line-height: 1.22;
          }

          .birthday-sub-message {
            font-size: clamp(1.2rem, 5.2vw, 1.55rem);
            line-height: 1.4;
            margin-top: 0.85rem;
          }
        }
      `}</style>
    </main>
  )
}
