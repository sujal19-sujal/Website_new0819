import React from 'react'

interface FacelessCouplePhotosProps {
  isVisible: boolean
}

export const FacelessCouplePhotos: React.FC<FacelessCouplePhotosProps> = ({ isVisible }) => {
  return (
    <div
      className="couple-photos-container"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 2.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      aria-hidden="true"
    >
      {/* Photo 1: Hands intertwined at dusk (Top Left) */}
      <div className="couple-photo-item photo-top-left">
        <div className="photo-inner">
          <img
            src="/images/couple-1-hands.jpg"
            alt="Romantic couple holding hands closely"
            loading="eager"
            className="photo-img"
          />
          <div className="photo-romantic-tint" />
        </div>
      </div>

      {/* Photo 2: Embracing couple seen from behind (Bottom Left) */}
      <div className="couple-photo-item photo-bottom-left">
        <div className="photo-inner">
          <img
            src="/images/couple-2-embrace.jpg"
            alt="Couple embracing and watching the twilight city from behind"
            loading="eager"
            className="photo-img"
          />
          <div className="photo-romantic-tint" />
        </div>
      </div>

      {/* Photo 3: Walking under streetlights from behind (Top Right) */}
      <div className="couple-photo-item photo-top-right">
        <div className="photo-inner">
          <img
            src="/images/couple-3-streetlights.jpg"
            alt="Couple walking under streetlights at night from behind"
            loading="eager"
            className="photo-img"
          />
          <div className="photo-romantic-tint" />
        </div>
      </div>

      {/* Photo 4: Sunset silhouette over sea (Bottom Right) */}
      <div className="couple-photo-item photo-bottom-right">
        <div className="photo-inner">
          <img
            src="/images/couple-4-sunset.jpg"
            alt="Couple sitting together watching sunset over the ocean"
            loading="eager"
            className="photo-img"
          />
          <div className="photo-romantic-tint" />
        </div>
      </div>

      {/* Photo 5: Under starry night sky (Bottom Center Accent) */}
      <div className="couple-photo-item photo-bottom-center">
        <div className="photo-inner">
          <img
            src="/images/couple-5-stars.jpg"
            alt="Couple standing beneath the starry night sky from behind"
            loading="eager"
            className="photo-img"
          />
          <div className="photo-romantic-tint" />
        </div>
      </div>

      <style>{`
        .couple-photo-item {
          position: absolute;
          animation: photoBreathe 14s ease-in-out infinite alternate;
          will-change: transform;
        }

        .photo-inner {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(201, 0, 43, 0.28);
          box-shadow: 
            0 16px 40px rgba(10, 0, 2, 0.75),
            0 0 25px rgba(90, 0, 16, 0.3);
          background-color: var(--dark-wine);
        }

        .photo-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.05) saturate(1.1);
          transform: scale(1.02);
        }

        /* Delicate warm burgundy color grading overlay */
        .photo-romantic-tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            145deg,
            rgba(90, 0, 16, 0.22) 0%,
            rgba(59, 0, 8, 0.12) 50%,
            rgba(36, 0, 6, 0.35) 100%
          );
          pointer-events: none;
        }

        /* Desktop Layout (default) */
        .photo-top-left {
          top: 5.5%;
          left: 4.5%;
          width: 300px;
          height: 215px;
          transform: rotate(-3deg);
          opacity: 0.56;
          animation-delay: 0s;
        }

        .photo-bottom-left {
          bottom: 5.5%;
          left: 4.5%;
          width: 310px;
          height: 220px;
          transform: rotate(2.5deg);
          opacity: 0.58;
          animation-delay: -4s;
        }

        .photo-top-right {
          top: 5.5%;
          right: 4.5%;
          width: 300px;
          height: 215px;
          transform: rotate(2.8deg);
          opacity: 0.56;
          animation-delay: -8s;
        }

        .photo-bottom-right {
          bottom: 5.5%;
          right: 4.5%;
          width: 310px;
          height: 220px;
          transform: rotate(-2.5deg);
          opacity: 0.58;
          animation-delay: -12s;
        }

        .photo-bottom-center {
          bottom: 2.5%;
          left: 50%;
          transform: translateX(-50%) rotate(0.5deg);
          width: 250px;
          height: 175px;
          opacity: 0.44;
          animation-delay: -6s;
        }

        /* iPad / Tablet layout */
        @media (max-width: 1024px) {
          .photo-top-left {
            top: 4.5%;
            left: 3%;
            width: 220px;
            height: 160px;
            opacity: 0.52;
          }
          .photo-bottom-left {
            bottom: 4.5%;
            left: 3%;
            width: 230px;
            height: 165px;
            opacity: 0.52;
          }
          .photo-top-right {
            top: 4.5%;
            right: 3%;
            width: 220px;
            height: 160px;
            opacity: 0.52;
          }
          .photo-bottom-right {
            bottom: 4.5%;
            right: 3%;
            width: 230px;
            height: 165px;
            opacity: 0.52;
          }
          .photo-bottom-center {
            display: none;
          }
        }

        /* Mobile layout (Clean, minimal, keeps heading 100% unobstructed) */
        @media (max-width: 640px) {
          .photo-top-left {
            top: 2.5%;
            left: -10px;
            width: 145px;
            height: 110px;
            transform: rotate(-4deg);
            opacity: 0.42;
          }
          .photo-top-right {
            top: 2.5%;
            right: -10px;
            width: 145px;
            height: 110px;
            transform: rotate(4deg);
            opacity: 0.42;
          }
          .photo-bottom-left {
            bottom: 3%;
            left: -8px;
            width: 150px;
            height: 112px;
            transform: rotate(3deg);
            opacity: 0.42;
          }
          .photo-bottom-right {
            bottom: 3%;
            right: -8px;
            width: 150px;
            height: 112px;
            transform: rotate(-3deg);
            opacity: 0.42;
          }
          .photo-bottom-center {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
