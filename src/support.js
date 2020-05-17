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
