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

  const nextCourse = (domElement, type) => {
    if (courseEnhanced) {
      // 如果本节有下一课程，则学习下一课程
      if (domElement.nextElementSibling) {
        domElement.nextElementSibling.click()
        return true
      } else {
        // 如果本节没有下一课程，则获取下一节的第一个课程
        const nextCourseDom = domElement.parentNode.parentNode.nextElementSibling
        if (nextCourseDom) {
          // 获取到课程，则开始学习
          nextCourseDom.querySelector('dl.required').click()
          return true
        } else {
          // 否则，发送全部学习完成事件
          window.dispatchEvent(new CustomEvent('allFinished'))
          if (!allFinishedFlag) {
            if (type === '文档' || type === '图文') {
              window.dispatchEvent(new CustomEvent('fileFinished'))
            }
            if (type === '视频' || type === '音频') {
              window.dispatchEvent(new CustomEvent('videoFinished'))
            }
          }
          allFinishedFlag = true
        }
        return false
      }
    } return true
  }

  let scanCounter = 0
  let allFinishedFlag = false
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
      // 超过一分钟没有变化，则刷新页面
      if (scanCounter >= 75) {
        document.location.reload()
      }
      // 状态变成已完成，则学习下一课程
      if (status === '已完成') {
        if (nextCourse(focused, type)) {
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
        if (courseEnhanced) {
          const pauseFlag = document.querySelector('button.videojs-referse-btn.vjs-hidden')
          // 发现暂停则恢复播放
          if (!pauseFlag) {
            const replay = document.querySelector('button.videojs-referse-btn')
            await wait(400)
            replay.click()
            window.dispatchEvent(new CustomEvent('preventPause'))
          }
          const slowFlag = document.querySelector('div.slow-img.iconfont.icon-reload')
          if (slowFlag) {
            slowFlag.click()
          }
        }
      }
      if (status === '已完成') {
        // 已完成则学习下一课程
        if (nextCourse(focused, type)) {
          window.dispatchEvent(new CustomEvent('videoFinished'))
        }
      }
      const title = document.querySelector('div.h3.strong')
      title.click()
    }
  }, 800)
})()
