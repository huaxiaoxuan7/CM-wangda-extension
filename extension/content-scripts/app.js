const videoScript = document.createElement('script')
const fileScript = document.createElement('script')
videoScript.src = chrome.runtime.getURL('./resources/video.js')
fileScript.src = chrome.runtime.getURL('./resources/file.js')

// document.body.appendChild(videoScript)
// document.body.appendChild(fileScript)
