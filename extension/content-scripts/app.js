const videoScript = document.createElement('script')
const fileScript = document.createElement('script')
videoScript.src = chrome.runtime.getURL('./resources/video.js')
fileScript.src = chrome.runtime.getURL('./resources/file.js')

chrome.runtime.sendMessage({ message: 'NMSL' }, function (response) {
  console.log(response)
})
