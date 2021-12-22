chrome.runtime.onInstalled.addListener((reason) => {
  chrome.storage.sync.set({ subjectList: [] }, () => { })
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
  const { action } = JSON.parse(request.greeting)
  if (action === 'close_tab') {
    chrome.tabs.remove(sender.tab.id)
  } else if (action === 'open_tab') {
    const { url } = JSON.parse(request.greeting)
    chrome.tabs.create({ url })
  }
})

// chrome.storage.local.set({ panelPositionX: x, panelPositionY: y }, () => { })
