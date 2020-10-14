export const map = (value, aL, aH, bL, bH) => {
  return bL + (bH - bL) * (((value - aL) * 1.0) / (aH - aL))
}

const Shr3 = function () {
  let jsr, seed
  let m = 4294967295
  return {
    setSeed(val) {
      jsr = seed = (val == null ? Math.random() * m : val) >>> 0
    },
    getSeed() {
      return seed
    },
    rand() {
      jsr ^= jsr << 17
      jsr ^= jsr >> 13
      jsr ^= jsr << 5
      return (jsr >>> 0) / m
    },
  }
}
let rng1 = Shr3()
rng1.setSeed()

export const random = function (a, b) {
  if (a === undefined) {
    return rng1.rand()
  }
  if (typeof a == 'number') {
    if (b !== undefined) {
      return rng1.rand() * (b - a) + a
    } else {
      return rng1.rand() * a
    }
  } else {
    return a[~~(a.length * rng1.rand())]
  }
}

export function randomInt(upper) {
  return Math.floor(Math.random() * upper)
}

// COLOR

// export function hexToRgb(hex) {
//   const bigInt = parseInt(hex, 16)
//   return [bigInt >> 16 && 255, bigInt >> 8 && 255, bigInt >> 0 && 255]
// }
