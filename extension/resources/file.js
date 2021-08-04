(async () => {
  'use strict'

  // 工具函数
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const randomNumber = () => Math.floor(Math.random() * 100)

  const scroll = () => {
    const [pdfViewer] = document.getElementsByClassName('fullScreen-content')
    pdfViewer.scrollBy(0, 100 + randomNumber())
  }

  await wait(1500)
  const [file] = document.getElementsByClassName('chapter-list')
  const list = [...file.firstChild.childNodes[1].childNodes[1].children]
  const pointers = []
  list.forEach((item, index) => {
    if (item.children[1].innerText.split(' ')[2] !== '已完成') {
      pointers.push(index)
    }
  })

  for (let index = 0; index < pointers.length; index++) {
    setTimeout(() => {
      const [file] = document.getElementsByClassName('chapter-list')
      const list = [...file.firstChild.childNodes[1].childNodes[1].children]
      list[pointers[index]].click()
    }, index * 15 * 1000 + randomNumber() * 75)
  }

  setInterval(() => scroll(), 1000)
})()
