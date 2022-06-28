(async () => {
  'use strict'

  window.addEventListener('openCourse', ({ detail }) => {
    const { pointer } = detail
    getElements('btn small').then(buttons => buttons[pointer].click())
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

  // 课程类型
  const contents = await getElements('content new')
  // 课程类型
  const types = await getElements('pull-left lib')
  // 课程名称
  const names = document.querySelectorAll('div.title > a.normal')
  // 按钮名称
  const buttons = await getElements('btn small')
  // 是否必修
  const images = await getElements('normal img-cont-a')

  const courses = []
  // 校验各属性类型是否一致🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️
  if (
    contents.length === types.length &&
    contents.length === names.length &&
    contents.length === buttons.length &&
    contents.length === images.length
  ) {
    contents.forEach((element, index) => {
      const action = buttons[index].innerText
      courses.push({
        index,
        type: types[index].innerText,
        name: names[index].innerText,
        action,
        isInProgress: (action === '开始学习' || action === '继续学习' || action === '参加考试' || action === '进入知识'),
        isOptional: !(images[index].children.length === 1)
      })
    })
  }
  try {
    // 专题名称
    // detail: pass data to dom.js
    window.dispatchEvent(new CustomEvent('subjectList', { detail: courses }))
    const subjectName = document.getElementsByClassName('title-row title-row-block clearfix')[0].querySelector('div.h3').innerText
    window.dispatchEvent(new CustomEvent('subjectName', { detail: subjectName }))
  } catch (err) {
    console.error(err)
  }
})()
