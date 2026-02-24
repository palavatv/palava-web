export default {
  log(...args: unknown[]) {
    console.log('DEBUG', ...args)
  },
  info(...args: unknown[]) {
    console.log('INFO', ...args)
  },
  warn(...args: unknown[]) {
    console.warn('WARNING', ...args)
  },
  error(...args: unknown[]) {
    console.error('ERROR', ...args)
  },
}
