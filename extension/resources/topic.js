(async () => {
  'use strict'

  // 工具函数

  const e = [...document.getElementsByClassName('btn small')]
  const pointers = []

  e.forEach((item, index) => {
    if (item.innerText !== '重新学习') {
      pointers.push(index)
    }
  })

  console.log(pointers)

  for (let index = 0; index < pointers.length; index++) {
    const e = [...document.getElementsByClassName('btn small')]
    console.log(1)
    e[pointers[index]].click()
  }
})()
