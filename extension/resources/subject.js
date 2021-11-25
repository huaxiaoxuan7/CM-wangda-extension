(async () => {
  'use strict'

  window.addEventListener('openCourse', ({ detail }) => {
    console.log(detail)
  })

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const getElements = async (className) => {
    let elements = [...document.getElementsByClassName(className)]
    while (elements.length === 0) {
      await wait(500)
      elements = [...document.getElementsByClassName(className)]
    }
    return elements
  }

  const getcourseNames = async () => {
    const names = await getElements('text-overflow title')
    const courseNames = []
    names.forEach((element, index) => {
      if (element.firstChild.nodeName === 'A') {
        courseNames.push(element.innerText)
      }
    })
    return courseNames
  }

  const buttons = await getElements('btn small')
  const courseNames = await getcourseNames()
  const unfinishedCourse = []
  const pointersExam = []

  buttons.forEach((item, index) => {
    if (item.innerHTML === '开始学习' || item.innerHTML === '继续学习') {
      unfinishedCourse.push({ name: courseNames[index], index })
    }
    if (item.innerHTML === '参加考试' || item.innerHTML === '重新考试') {
      pointersExam.push({ name: courseNames[index], index })
    }
  })

  const event = new CustomEvent('subjectList', {
    detail: {
      courses: buttons.length,
      unfinished: unfinishedCourse,
      exams: pointersExam
    }
  })
  window.dispatchEvent(event)

  const contents = await getElements('content new')
  contents.forEach(element => {
    console.log(
      // 类型
      element.children[1].children[0].innerText,
      // 名称
      element.children[1].children[1].children[0].innerText,
      // 状态
      // element.children[0].children[0].children[0].innerText,
      // 必修选修
      element.children[0].children[1].children[0].children.length === 2 ? '选修' : '必修'
    )
  })
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
