import { convertRgbToOkLch, safeOklchToRgb } from './culori'

type RGBColor = [number, number, number]
type HashColor = `#${string}`
interface LCHColor {
  l: number
  c: number
  h: number
}

export type ColorType = RGBColor | HashColor

// Hex to RGB conversion
function hexToRgb(hex: string): RGBColor {
  const hexes = /^#?([\da-f]+)$/i.exec(hex.toLowerCase())
  let hexString = '00aeec'

  if (hexes && hexes[1]) {
    const tar = hexes[1]
    if (tar.length >= 3 && tar.length < 6) {
      const tmp = tar.slice(0, 3)
      hexString = `${tmp[0]}${tmp[0]}${tmp[1]}${tmp[1]}${tmp[2]}${tmp[2]}`
    }

    if (tar.length >= 6) {
      hexString = tar.slice(0, 6)
    }
  }

  const result = /([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hexString)
  return result
    ? [
        Number.parseInt(result[1], 16),
        Number.parseInt(result[2], 16),
        Number.parseInt(result[3], 16),
      ]
    : [0, 0, 0]
}

// RGB to Hex conversion
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export class OkLch {
  lch: LCHColor

  constructor(color: ColorType) {
    let rgb: RGBColor
    if (typeof color === 'string') {
      rgb = hexToRgb(color)
    } else {
      rgb = color
    }
    this.lch = convertRgbToOkLch(rgb)
    if (this.lch.c < 0.08) {
      this.lch.c = 0.08
    }
  }

  /**
   * new Color
   * @param light 0-100
   * @param color 0-0.4
   * @param alpha 0-1
   * @returns
   */
  new(light: number, color?: number, alpha?: number): string {
    const rgb = safeOklchToRgb({
      h: this.lch.h,
      l: Math.min(100, light) / 100,
      c: color || this.lch.c,
    })

    const [r, g, b] = rgb.map((c) => {
      const tmp = Math.round(c * 255)
      return Math.min(Math.max(tmp, 0), 255)
    })

    if (alpha) {
      return `rgba(${r},${g},${b},${alpha})`
    }

    return rgbToHex(r, g, b)
  }
}
