chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if ('title' in info) {
    if (info.title === '中国移动网上人才发展中心') {
      if (tab.url.includes('https://wangda.chinamobile.com')) {
        const routerParams = tab.url.split('/')
        if (routerParams[4] !== 'exam') {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content-scripts/dom/dom.js']
          })
        }
      }
    }
  }
})

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
