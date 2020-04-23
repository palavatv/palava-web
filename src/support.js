
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

// Generates a pseudo-uuid
export function uuid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

// Returns a circled number Unicode character for given JavaScript number
export function fancyNumber(n) {
  return n ? String.fromCodePoint(9460 + n) : ""
  // return n ? String.fromCodePoint(10121 + n) : ""
  // return n ? String.fromCodePoint(65834 + n) : ""
  // return n ? String.fromCodePoint(65816 + n) : ""
}
