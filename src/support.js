// Returns a circled number Unicode character for given JavaScript number
export function fancyNumber(n) {
  return "🦜".repeat(n);
}

// Detect user's browser language
export function detectLanguage() {
  return "de";
  // return navigator.languages
  //   ? navigator.languages[0]
  //   : navigator.language || navigator.userLanguage;
}

// Escapes a regex
export function escapeRegex(string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
