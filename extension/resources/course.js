(async () => {
  'use strict'

  // 工具函数
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const randomNumber = () => Math.floor(Math.random() * 100)

  const nextCourse = (domElement) => {
    if (domElement.nextElementSibling) {
      domElement.nextElementSibling.click()
      return true
    } else {
      return false
    }
  }

  let scanCounter = 0
  let videoSrc = ''

  // 面向过程的笨办法🤣😂🤣😂
  setInterval(async () => {
    scanCounter += 1
    const focused = document.getElementsByClassName('focus')[0]
    // 获取课程类型
    const type = document.querySelectorAll('dl.focus > dd > div.sub-text')[0].innerText
    // 获取课程状态
    const status = document.querySelectorAll('dl.focus > dd > div.item > span')[0].innerText
    if (type === '文档') {
      // 自动变成已完成，或者超过20秒左右，则学习下一课程
      if (status === '已完成' || scanCounter >= 25) {
        scanCounter = 0
        focused.nextElementSibling.click()
        window.dispatchEvent(new CustomEvent('fileFinished'))
      }
      // 未完成时持续翻页
      const [pdfViewer] = document.getElementsByClassName('fullScreen-content')
      pdfViewer.scrollBy(0, 50 + randomNumber())
    } else if (type === '视频') {
      if (status === '已完成') {
        // 已完成则学习下一课程
        if (nextCourse(focused)) {
          window.dispatchEvent(new CustomEvent('videoFinished'))
        }
      }
      const [video] = document.getElementsByTagName('video')
      if (video.src) {
        // 视频资源是之前的url吗？
        if (video.src !== videoSrc) {
          videoSrc = video.src
          if (!videoSrc) {
            window.dispatchEvent(new CustomEvent('videoFinished'))
          }
        }
        // 发现暂停则恢复播放
        const [pauseFlag] = document.getElementsByClassName('vjs-play-control vjs-control vjs-button vjs-paused')
        if (pauseFlag) {
          await wait(400)
          pauseFlag.click()
          window.dispatchEvent(new CustomEvent('preventPause'))
        }
      }
    }
    console.log(0)
  }, 800)
})()
