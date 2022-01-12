(async () => {
  'use strict'

  // 注册设置
  let courseEnhanced = true
  let autoMuted = true
  window.addEventListener('settingsLoaded', ({ detail }) => {
    courseEnhanced = detail.courseEnhanced
    autoMuted = detail.autoMuted
  })

  // 工具函数
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const randomNumber = () => Math.floor(Math.random() * 100)

  const nextCourse = (domElement) => {
    if (courseEnhanced) {
      if (domElement.nextElementSibling) {
        domElement.nextElementSibling.click()
        return true
      } else {
        const nextCourse = domElement.parentNode.parentNode.nextElementSibling
        if (nextCourse) {
          nextCourse.querySelector('dl.required').click()
          return true
        } else {
          window.dispatchEvent(new CustomEvent('allFinished'))
        }
        return false
      }
    } return true
  }

  let scanCounter = 0
  let videoSrc = ''

  // 面向过程的笨办法🤣😂🤣😂
  setInterval(async () => {
    scanCounter += 1
    const focused = document.getElementsByClassName('focus')[0]
    // 获取课程类型
    const type = focused.querySelector('dd > div.sub-text').innerText
    // 获取课程状态
    const status = focused.querySelector('dd > div.pointer > span').innerText
    if (type === '文档' || type === '图文') {
      // 自动变成已完成，或者超过20秒左右，则学习下一课程
      if (status === '已完成' || scanCounter >= 25) {
        if (nextCourse(focused)) {
          window.dispatchEvent(new CustomEvent('fileFinished'))
        }
        scanCounter = 0
      }
      // 未完成时持续翻页
      if (courseEnhanced) {
        const [pdfViewer] = document.getElementsByClassName('fullScreen-content')
        if (pdfViewer) {
          pdfViewer.scrollBy(0, 50 + randomNumber())
        }
      }
    } else if (type === '视频' || type === '音频') {
      let media = {}
      if (type === '视频') {
        media = document.getElementsByTagName('video')[0]
      } else if (type === '音频') {
        media = document.getElementsByTagName('audio')[0]
      }
      if (media.src) {
        // 视频资源是之前的url吗？
        if (media.src !== videoSrc) {
          // 不是，则记录该视频地址
          videoSrc = media.src
          if (autoMuted) {
            media.muted = true
          }
        }
        // 发现暂停则恢复播放
        if (courseEnhanced) {
          const [pauseFlag] = document.getElementsByClassName('vjs-play-control vjs-control vjs-button vjs-paused')
          if (pauseFlag) {
            await wait(400)
            pauseFlag.click()
            window.dispatchEvent(new CustomEvent('preventPause'))
          }
        }
      }
      if (status === '已完成') {
        // 已完成则学习下一课程
        if (nextCourse(focused)) {
          window.dispatchEvent(new CustomEvent('videoFinished'))
        }
      }
    }
  }, 800)
})()
