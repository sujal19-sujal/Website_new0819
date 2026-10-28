export interface FloatingEmojiItem {
  id: number
  emoji: string
  top: number // percentage
  left: number // percentage
  size: number // px
  opacity: number // 0.08 to 0.18
  blur: number // px
  duration: number // seconds
  delay: number // seconds
  driftType: 'A' | 'B' | 'C'
}

export interface CouplePhotoItem {
  id: string
  src: string
  alt: string
  desktopStyle: {
    top?: string
    bottom?: string
    left?: string
    right?: string
    width: string
    height: string
    rotate: string
  }
  mobileStyle: {
    top?: string
    bottom?: string
    left?: string
    right?: string
    width: string
    height: string
    rotate: string
    showOnMobile: boolean
  }
  opacity: number
}
