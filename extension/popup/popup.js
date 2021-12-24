const switches = [...document.getElementsByTagName('input')]
switches.forEach((element, index) => {
  chrome.storage.sync.get(['settings'], ({ settings }) => {
    element.checked = settings[index].value
    element.onchange = (e) => {
      settings[index].value = e.target.checked
      chrome.storage.sync.set({ settings }, () => {
        chrome.storage.sync.get(['settings'])
      })
    }
  })
})
