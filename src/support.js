
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

// Generates a pseudo-uuid
export function uuid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}
