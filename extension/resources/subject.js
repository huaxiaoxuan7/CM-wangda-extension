(async () => {
  'use strict'

  window.addEventListener('openCourse', ({ detail }) => {
    console.log(detail)
  })

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const getButtons = async () => {
    let buttons = [...document.getElementsByClassName('btn small')]
    while (buttons.length === 0) {
      await wait(500)
      buttons = [...document.getElementsByClassName('btn small')]
    }
    return buttons
  }

  const buttons = await getButtons()
  const pointers = []

  buttons.forEach((item, index) => {
    if (item.innerText !== '重新学习') {
      if (item.innerText !== '参加考试') {
        pointers.push(index)
      }
    }
  })

  // chrome.runtime.sendMessage({ message: 'NMSL' })

  chrome.runtime.sendMessage('cjeblmiecpnejpkmdhopgcilcgfankel', {
    id: document.URL.split('/')[7],
    content: JSON.stringify({
      courses: buttons.length + 1,
      unfinished: pointers.length + 1,
      index: pointers
    })
  }, function (response) {
    console.log(response.farewell)
  })

  const event = new CustomEvent('subjectList', {
    detail: {
      courses: buttons.length + 1,
      unfinished: pointers.length + 1,
      index: pointers
    }
  })
  window.dispatchEvent(event)

  // for (let index = 0; index < pointers.length; index++) {
  //   const buttons = [...document.getElementsByClassName('btn small')]
  //   buttons[pointers[index]].click()
  // }
})()
