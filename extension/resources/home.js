(async () => {
  'use strict'
  window.addEventListener('openSubject', ({ detail }) => {
    const { url } = detail
    chrome.runtime.sendMessage({ greeting: JSON.stringify({ action: 'open_tab', url }) }, () => {})
  })
})()
