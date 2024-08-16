/* eslint-disable no-cond-assign */
/* eslint-disable ts/no-loss-of-precision */
type RGBColor = [number, number, number]

interface LCHColor {
  l: number
  c: number
  h: number
}

const normalizeHue = (hue: number) => ((hue = hue % 360) < 0 ? hue + 360 : hue)

function convertLabToLch(lab: { l: number, a: number, b: number }): LCHColor {
  const { l, a, b } = lab
  const c = Math.sqrt(a * a + b * b)
  let h = 0
  if (c)
    h = normalizeHue((Math.atan2(b, a) * 180) / Math.PI)
  return { l, c, h }
}

export function convertRgbToOkLch(rgb: RGBColor): LCHColor {
  function convertLrgbToOkLab(lrgb: RGBColor): {
    l: number
    a: number
    b: number
  } {
    const [r, g, b] = lrgb
    const L = Math.cbrt(
      0.41222147079999993 * r + 0.5363325363 * g + 0.0514459929 * b,
    )
    const M = Math.cbrt(
      0.2119034981999999 * r + 0.6806995450999999 * g + 0.1073969566 * b,
    )
    const S = Math.cbrt(
      0.08830246189999998 * r + 0.2817188376 * g + 0.6299787005000002 * b,
    )

    return {
      l: 0.2104542553 * L + 0.793617785 * M - 0.0040720468 * S,
      a: 1.9779984951 * L - 2.428592205 * M + 0.4505937099 * S,
      b: 0.0259040371 * L + 0.7827717662 * M - 0.808675766 * S,
    }
  }
  function convertRgbToLrgb(rgb: RGBColor): RGBColor {
    const fn = (c: number) => {
      const abs = Math.abs(c)
      if (abs <= 0.04045) {
        return c / 12.92
      }
      return (Math.sign(c) || 1) * ((abs + 0.055) / 1.055) ** 2.4
    }

    return rgb.map(c => fn(c / 255)) as RGBColor
  }

  const convertRgbToOkLab = (rgb: RGBColor) => {
    const res = convertLrgbToOkLab(convertRgbToLrgb(rgb))
    if (rgb[0] === rgb[2] && rgb[2] === rgb[1]) {
      res.a = res.b = 0
    }
    return convertLrgbToOkLab(convertRgbToLrgb(rgb))
  }

  return convertLabToLch(convertRgbToOkLab(rgb))
}

function convertOklchToRgb(oklch: LCHColor): RGBColor {
  function convertLrgbToRgb(lrgb: RGBColor): RGBColor {
    const fn = (c: number) => {
      const abs = Math.abs(c)
      if (abs > 0.0031308) {
        return (Math.sign(c) || 1) * (1.055 * abs ** (1 / 2.4) - 0.055)
      }
      return c * 12.92
    }

    return lrgb.map(c => fn(c)) as RGBColor
  }
  function convertOklabToLrgb(okLab: {
    l: number
    a: number
    b: number
  }): RGBColor {
    const { l, a, b } = okLab
    const L = (l * 0.99999999845051981432
      + 0.39633779217376785678 * a
      + 0.21580375806075880339 * b) ** 3
    const M = (l * 1.0000000088817607767
      - 0.1055613423236563494 * a
      - 0.063854174771705903402 * b) ** 3
    const S = (l * 1.0000000546724109177
      - 0.089484182094965759684 * a
      - 1.2914855378640917399 * b) ** 3

    const res = {
      r: +4.076741661347994 * L - 3.307711590408193 * M + 0.230969928729428 * S,
      g:
        -1.2684380040921763 * L
        + 2.6097574006633715 * M
        - 0.3413193963102197 * S,
      b:
        -0.004196086541837188 * L
        - 0.7034186144594493 * M
        + 1.7076147009309444 * S,
    }

    return [res.r, res.g, res.b]
  }
  function convertOklabToRgb(okLab: {
    l: number
    a: number
    b: number
  }): RGBColor {
    return convertLrgbToRgb(convertOklabToLrgb(okLab))
  }
  function convertLchToLab(lch: LCHColor): { l: number, a: number, b: number } {
    const { l, c, h } = lch
    const res = {
      l,
      a: c ? c * Math.cos((h / 180) * Math.PI) : 0,
      b: c ? c * Math.sin((h / 180) * Math.PI) : 0,
    }
    return res
  }
  return convertOklabToRgb(convertLchToLab(oklch))
}

export function safeOklchToRgb(oklch: LCHColor): RGBColor {
  let rgb = convertOklchToRgb(oklch)
  const unSafeC = (c: RGBColor) => {
    return c.some(c => c < 0 || c > 1)
  }
  if (unSafeC(rgb) && !unSafeC(convertOklchToRgb({ ...oklch, c: 0 }))) {
    let start = 0
    let end = oklch.c
    let goodC = 0
    const resolution = 0.4 / 2 ** 13
    while (end - start > resolution) {
      const mid = start + (end - start) * 0.5
      const tmp = convertOklchToRgb({ ...oklch, c: mid })
      if (unSafeC(tmp)) {
        end = mid
      }
      else {
        goodC = mid
        start = mid
      }
    }
    rgb = convertOklchToRgb({ ...oklch, c: goodC })
  }
  return rgb
}
