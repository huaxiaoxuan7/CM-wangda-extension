const settingsNames = ['courseEnhanced', 'autoMute', 'autoCloseTab', 'homePanel', 'subjectPanel', 'coursePanel']

const switches = [...document.getElementsByTagName('input')]
switches.forEach((element, index) => {
  chrome.storage.sync.get(['settings'], ({ settings }) => {
    console.log(settings[index][settingsNames[index]])
    element.checked = settings[index][settingsNames[index]]

    element.onchange = (e) => {
      settings[index][settingsNames[index]] = e.target.checked
      chrome.storage.sync.set({ settings }, () => {
        chrome.storage.sync.get(['settings'], ({ settings }) => console.log(1, settings))
      })
    }
  })
})
