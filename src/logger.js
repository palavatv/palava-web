export default {
  log(...args) {
    console.log('DEBUG', ...args)
  },

  info(...args) {
    console.log('INFO', ...args)
  },

  warn(...args) {
    console.warn('WARNING', ...args)
  },

  error(...args) {
    console.error('ERROR', ...args)
  },
}
