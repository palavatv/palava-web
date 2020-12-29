/* eslint no-bitwise: ["error", { "allow": ["<<"] }] */

import config from '@/config'

// Returns a circled number Unicode character for given JavaScript number
export function fancyNumber(n) {
  return "🦜".repeat(n);
  // return n ? String.fromCodePoint(9460 + n) : ""
  // return n ? String.fromCodePoint(10121 + n) : ""
  // return n ? String.fromCodePoint(65834 + n) : ""
  // return n ? String.fromCodePoint(65816 + n) : ""
}

// Detect user's browser language
export function detectLanguage() {
  return navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage)
}

// Escapes a regex
export function escapeRegex(string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function hash(str) {
  let sum = 0
  for (let i = 0; i < str.length; i += 1) {
    sum += ((i + 1) * str.codePointAt(i)) / (1 << 8)
  }
  return sum % 1;
}

function getInRange(val, min, max) {
  return Math.floor(val * (max - min + 1)) + min;
}

export function generateColor(str) {
  const hash1 = hash(str.slice(0, str.length / 3))
  const hash2 = hash(str.slice(str.length / 3, (str.length / 3) * 2))
  const hash3 = hash(str.slice((str.length / 3) * 2))

  const h = getInRange(hash1, 0, 360)
  const s = getInRange(hash2, 42, 98)
  const l = getInRange(hash3, 40, 90)

  return `hsl(${h},${s}%,${l}%)`
}

export function generateAvatar(str) {
  return config.peerAvatars[getInRange(hash(str), 0, config.peerAvatars.length - 1)]
}
