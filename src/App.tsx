import { useState, useEffect } from 'react'
import { FloatingEmojis } from './components/FloatingEmojis'
import { FacelessCouplePhotos } from './components/FacelessCouplePhotos'
import { BirthdayHero } from './components/BirthdayHero'
import { PasscodeLock } from './components/PasscodeLock'
import { SurprisePage } from './components/SurprisePage'

export function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [openingStep, setOpeningStep] = useState(0)
  const [activePage, setActivePage] = useState<'home' | 'surprise'>('home')

  // Trigger opening animation sequence after successful unlock
  const handleUnlockSuccess = () => {
    setIsUnlocked(true)
  }

  useEffect(() => {
    if (!isUnlocked) return

    // Opening animation sequence for home screen:
    const t1 = setTimeout(() => setOpeningStep(1), 200)
    const t2 = setTimeout(() => setOpeningStep(2), 600)
    const t3 = setTimeout(() => setOpeningStep(3), 1300)
    const t4 = setTimeout(() => setOpeningStep(4), 2100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [isUnlocked])

  return (
    <div
      className="romantic-app-root"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100svh',
        overflow: 'hidden',
        background: `radial-gradient(
          circle at 50% 48%,
          #5A0010 0%,
          #3B0008 38%,
          #240006 72%,
          #150003 100%
        )`,
      }}
    >
      {/* Cinematic subtle film grain */}
      <div className="film-grain" />

      {/* Intimate Vignette Overlay */}
      <div className="vignette-overlay" />

      {/* Secret Passcode Lock Screen (Displayed first) */}
      {!isUnlocked && (
        <PasscodeLock onUnlockSuccess={handleUnlockSuccess} />
      )}

      {/* Main Birthday Content (Page 1) */}
      {isUnlocked && activePage === 'home' && (
        <>
          {/* Faded love emojis floating naturally in the atmosphere */}
          <FloatingEmojis isVisible={openingStep >= 2} />

          {/* Aesthetic faceless romantic couple photographs softly blended */}
          <FacelessCouplePhotos isVisible={openingStep >= 3} />

          {/* Centered romantic birthday heading: "Happy Birthday babygirl ❤️" */}
          <BirthdayHero isVisible={openingStep >= 4} />

          {/* Subtle Navigation Trigger to Second Page */}
          <div
            className={`surprise-nav-wrapper ${openingStep >= 4 ? 'visible' : ''}`}
            style={{
              position: 'fixed',
              bottom: 'calc(env(safe-area-inset-bottom, 16px) + 24px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 15,
              opacity: openingStep >= 4 ? 1 : 0,
              transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
            }}
          >
            <button
              onClick={() => setActivePage('surprise')}
              className="surprise-nav-btn"
              aria-label="Open birthday surprise page"
            >
              <span className="nav-heart-icon" aria-hidden="true">♡</span>
              <span className="nav-text">One more surprise ♡</span>
            </button>
          </div>
        </>
      )}

      {/* New Second Page: The Surprise (Page 2) */}
      {isUnlocked && activePage === 'surprise' && (
        <SurprisePage onBack={() => setActivePage('home')} />
      )}

      {/* Background ambient emojis during passcode lock for rich initial impression */}
      {!isUnlocked && <FloatingEmojis isVisible={true} />}

      <style>{`
        .surprise-nav-btn {
          background: rgba(59, 0, 8, 0.55);
          border: 1px solid rgba(201, 0, 43, 0.38);
          border-radius: 999px;
          padding: 10px 22px;
          color: #FFF0F2;
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-style: italic;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 
            0 8px 24px rgba(10, 0, 2, 0.7),
            0 0 18px rgba(139, 0, 24, 0.3);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          user-select: none;
        }

        .surprise-nav-btn:hover {
          background: rgba(90, 0, 16, 0.85);
          border-color: #FF5E7E;
          transform: translateY(-3px) scale(1.04);
          box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.8),
            0 0 28px rgba(255, 77, 109, 0.6);
        }

        .surprise-nav-btn:active {
          transform: translateY(1px);
        }

        .nav-heart-icon {
          color: #FF758F;
          font-size: 1.15rem;
          line-height: 1;
          filter: drop-shadow(0 0 8px rgba(255, 77, 109, 0.8));
          animation: navHeartPulse 2.8s ease-in-out infinite;
        }

        .nav-text {
          background: linear-gradient(180deg, #FFFFFF 0%, #FFD6DC 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes navHeartPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
            filter: drop-shadow(0 0 14px rgba(255, 77, 109, 1));
          }
        }
      `}</style>
    </div>
  )
}

export default App
