chrome.runtime.onInstalled.addListener((reason) => {
  chrome.storage.sync.set({
    subjectList: [],
    settings: [
      { name: 'courseEnhanced', value: true },
      { name: 'autoMute', value: true },
      { name: 'autoCloseTab', value: false },
      { name: 'homePanel', value: true },
      { name: 'subjectPanel', value: true },
      { name: 'coursePanel', value: true }
    ]
  }, () => { })
  chrome.tabs.create({
    url: 'welcome.html'
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log('Request comes from content script ' + sender.tab.id)
  const { action } = JSON.parse(request.greeting)
  if (action === 'close_tab') {
    chrome.tabs.remove(sender.tab.id)
  } else if (action === 'open_tab') {
    const { url } = JSON.parse(request.greeting)
    chrome.tabs.create({ url })
  }
})
