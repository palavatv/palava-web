if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js?v=ecb549d9-939d-4bd9-80db-771ae75dda9e').then(() => {
    // console.log('service worker registration complete')
  }, () => {
    // console.log('service worker registration failure')
  })
}
