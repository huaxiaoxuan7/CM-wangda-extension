(async () => {
  'use strict'

  window.addEventListener('openCourse', ({ detail }) => {
    console.log(detail)
  })

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const getElements = async (className) => {
    let elements = [...document.getElementsByClassName(className)]
    while (elements.length === 0) {
      await wait(1000)
      elements = [...document.getElementsByClassName(className)]
    }
    return elements
  }

  const contents = await getElements('content new')
  const courses = []
  contents.forEach(element => {
    courses.push({
      type: element.children[1].children[0].innerText,
      name: element.children[1].children[1].children[0].innerText,
      isCompulsory: element.children[0].children[1].children[0].children.length !== 2
    })
  })

  const buttons = await getElements('btn small')
  buttons.forEach((item, index) => {
    courses[index].isInProgress = (item.innerHTML === '开始学习' || item.innerHTML === '继续学习' || item.innerHTML === '参加考试')
  })

  // console.log(courses)
  // console.log(
  //   courses.filter(item => (!item.isInProgress && item.isCompulsory)),
  //   courses.filter(item => (item.isInProgress && item.isCompulsory)),
  //   courses.filter(item => (!item.isCompulsory))
  // )

  // detail: pass data to dom.js
  const event = new CustomEvent('subjectList', { detail: courses })
  window.dispatchEvent(event)

  // chrome.runtime.sendMessage({ message: 'NMSL' })

  // chrome.runtime.sendMessage('cjeblmiecpnejpkmdhopgcilcgfankel', {
  //   id: document.URL.split('/')[7],
  //   content: JSON.stringify({
  //     courses: buttons.length + 1,
  //     unfinished: pointers.length + 1,
  //     index: pointers
  //   })
  // }, function (response) {
  //   console.log(response.farewell)
  // })

  // for (let index = 0; index < pointers.length; index++) {
  //   const buttons = [...document.getElementsByClassName('btn small')]
  //   buttons[pointers[index]].click()
  // }
})()
