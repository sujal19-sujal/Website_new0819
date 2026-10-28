import React, { useState, useRef, useEffect } from 'react'

interface PasscodeLockProps {
  onUnlockSuccess: () => void
}

export const PasscodeLock: React.FC<PasscodeLockProps> = ({ onUnlockSuccess }) => {
  const [passcode, setPasscode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passcode || isVerifying || isUnlocked) return

    setIsVerifying(true)
    setErrorMessage(null)

    try {
      // Server-side verification via API endpoint (with environment variable BIRTHDAY_PASSCODE support)
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          triggerUnlock()
          return
        }
      }

      showErrorState('Incorrect secret code ❤️')
    } catch {
      showErrorState('Verification failed. Please try again ❤️')
    } finally {
      setIsVerifying(false)
    }
  }

  const triggerUnlock = () => {
    setIsUnlocked(true)
    setTimeout(() => {
      onUnlockSuccess()
    }, 750)
  }

  const showErrorState = (msg: string) => {
    setErrorMessage(msg)
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    errorTimerRef.current = setTimeout(() => {
      setErrorMessage(null)
    }, 3500)
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric digits, preserve leading zeroes, max 16 digits
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 16)
    setPasscode(cleaned)
    if (errorMessage) setErrorMessage(null)
  }

  return (
    <div
      className={`passcode-screen-container ${isUnlocked ? 'unlocking' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: `radial-gradient(
          circle at 50% 48%,
          #5A0010 0%,
          #3B0008 42%,
          #240006 78%,
          #150003 100%
        )`,
        transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className={`passcode-card ${errorMessage ? 'card-error' : ''}`}
        style={{
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.4rem',
        }}
      >
        {/* Minimal Heart-shaped Lock Icon */}
        <div className={`lock-icon-wrapper ${isUnlocked ? 'icon-unlocked' : ''}`}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="heart-lock-svg"
          >
            {/* Shackle */}
            <path
              d="M24 28V19C24 14.5817 27.5817 11 32 11C36.4183 11 40 14.5817 40 19V28"
              stroke="#E8B4BC"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="shackle-path"
            />
            {/* Heart Body */}
            <path
              d="M32 54C32 54 13 41.5 13 28.5C13 21.5 18.5 16 25.5 16C28.2 16 30.5 17 32 19C33.5 17 35.8 16 38.5 16C45.5 16 51 21.5 51 28.5C51 41.5 32 54 32 54Z"
              fill="url(#heartGradient)"
              stroke="#8B0018"
              strokeWidth="2"
            />
            {/* Keyhole */}
            <circle cx="32" cy="31" r="2.5" fill="#FFEAEF" />
            <path d="M31.2 32.5L30.5 39H33.5L32.8 32.5Z" fill="#FFEAEF" />
            <defs>
              <linearGradient id="heartGradient" x1="13" y1="16" x2="51" y2="54" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B0018" />
                <stop offset="0.6" stopColor="#5A0010" />
                <stop offset="1" stopColor="#3B0008" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Short Message */}
        <h2 className="passcode-title">
          Enter our secret code <span className="heart-span">❤️</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="passcode-form">
          <div className="input-group">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={passcode}
              onChange={handleInputChange}
              maxLength={16}
              placeholder="••••••••••••••••"
              disabled={isVerifying || isUnlocked}
              className="passcode-input"
              autoComplete="off"
              aria-label="Secret Passcode"
            />
          </div>

          {/* Error Message */}
          <div className="error-msg-container">
            {errorMessage && (
              <span className="error-text" role="alert">
                {errorMessage}
              </span>
            )}
          </div>

          {/* Unlock Button */}
          <button
            type="submit"
            disabled={!passcode || isVerifying || isUnlocked}
            className="unlock-btn"
          >
            {isVerifying ? (
              <span className="btn-loading-dots">
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </span>
            ) : (
              <span>Unlock ❤️</span>
            )}
          </button>
        </form>
      </div>

      <style>{`
        .passcode-screen-container.unlocking {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        .lock-icon-wrapper {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(90, 0, 16, 0.45);
          border: 1px solid rgba(139, 0, 24, 0.45);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(139, 0, 24, 0.35);
          animation: lockPulse 4s ease-in-out infinite;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .heart-lock-svg {
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5));
          transition: transform 0.4s ease;
        }

        .shackle-path {
          transition: transform 0.5s ease;
          transform-origin: 24px 28px;
        }

        .icon-unlocked .shackle-path {
          transform: translateY(-7px) rotate(-18deg);
        }

        .icon-unlocked {
          animation: unlockBurst 0.75s ease-out forwards;
        }

        .passcode-title {
          font-family: var(--font-serif);
          font-size: 1.65rem;
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0.02em;
          color: var(--text-romantic);
          margin: 0;
          text-shadow: 0 0 16px rgba(201, 0, 43, 0.4);
        }

        .heart-span {
          font-style: normal;
          margin-left: 0.2rem;
        }

        .passcode-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
        }

        .input-group {
          width: 100%;
          position: relative;
        }

        .passcode-input {
          width: 100%;
          background: rgba(36, 0, 6, 0.75);
          border: 1.5px solid rgba(139, 0, 24, 0.5);
          border-radius: 14px;
          padding: 0.85rem 1.2rem;
          font-family: var(--font-sans);
          font-size: 1.25rem;
          letter-spacing: 0.28em;
          text-align: center;
          color: #FFF0F2;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
          box-shadow: 
            inset 0 2px 6px rgba(0, 0, 0, 0.6),
            0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .passcode-input::placeholder {
          color: rgba(232, 180, 188, 0.3);
          letter-spacing: 0.22em;
        }

        .passcode-input:focus {
          border-color: #C9002B;
          background: rgba(45, 0, 8, 0.85);
          box-shadow: 
            0 0 20px rgba(201, 0, 43, 0.4),
            inset 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .error-msg-container {
          min-height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-text {
          font-size: 0.95rem;
          font-weight: 500;
          color: #FF5E7E;
          letter-spacing: 0.02em;
          text-shadow: 0 0 12px rgba(255, 77, 109, 0.6);
          animation: fadeInError 0.3s ease;
        }

        @keyframes fadeInError {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-error {
          animation: shakeError 0.45s ease;
        }

        .unlock-btn {
          width: 100%;
          background: linear-gradient(135deg, #8B0018 0%, #5A0010 100%);
          border: 1px solid rgba(201, 0, 43, 0.45);
          border-radius: 14px;
          padding: 0.9rem 1.5rem;
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #FFF0F2;
          cursor: pointer;
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.6),
            0 0 15px rgba(139, 0, 24, 0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .unlock-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.15);
          box-shadow: 
            0 12px 28px rgba(0, 0, 0, 0.7),
            0 0 25px rgba(201, 0, 43, 0.55);
        }

        .unlock-btn:active:not(:disabled) {
          transform: translateY(1px);
        }

        .unlock-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-loading-dots span {
          display: inline-block;
          margin: 0 2px;
          font-size: 1.4rem;
          animation: dotPulse 1.2s infinite alternate;
        }
        .btn-loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .btn-loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}
