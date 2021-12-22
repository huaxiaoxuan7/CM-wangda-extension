chrome.runtime.onInstalled.addListener((reason) => {
  chrome.tabs.create({
    url: 'welcome.html'
  })
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request, sender)
    sendResponse({ farewell: 'goodbye' })
  }
)

chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    console.log(request, sender)
    sendResponse({ farewell: 'goodbye' })
  }
)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Request comes from content script ' + sender.tab.id)
  if (request.greeting === 'close_tab') {
    chrome.tabs.remove(sender.tab.id)
  }
})

// chrome.storage.local.set({ panelPositionX: x, panelPositionY: y }, () => { })
