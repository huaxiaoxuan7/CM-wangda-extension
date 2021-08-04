chrome.runtime.onInstalled.addListener(() => {
  console.log('hi')
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request, sender)
    sendResponse({ farewell: 'goodbye' })
  }
)
