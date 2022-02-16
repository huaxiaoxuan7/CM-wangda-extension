chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
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
    })
    chrome.tabs.create({ url: 'welcome.html' })
  }
  if (reason === 'update') {
    chrome.tabs.create({ url: 'update.html' })
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action } = JSON.parse(request.payload)
  // 插件生效时
  if (action === 'on_load') {
    const { tab: { id: tabId } } = sender
    chrome.action.setTitle({ tabId, title: '网大功能增强' })
    chrome.action.setBadgeText({ tabId, text: '启动' })
    chrome.action.setBadgeBackgroundColor({ tabId, color: '#F00' })
    chrome.action.setPopup({ tabId, popup: './popup/activated.html' })
  } else if (action === 'close_tab') {
    chrome.tabs.remove(sender.tab.id)
  } else if (action === 'open_tab') {
    const { url } = JSON.parse(request.payload)
    chrome.tabs.create({ url })
  }
})
