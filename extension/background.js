chrome.runtime.onInstalled.addListener((reason) => {
  chrome.storage.sync.set({
    subjectList: [],
    settings: [
      { courseEnhanced: true },
      { autoMute: true },
      { autoCloseTab: false },
      { homePanel: true },
      { subjectPanel: true },
      { coursePanel: true }
    ]
  }, () => { })
  chrome.tabs.create({
    url: 'welcome.html'
  })
})

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
