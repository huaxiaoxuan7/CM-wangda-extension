import React, { Component } from 'react'
import { Button, InputNumber } from 'antd'

class Subject extends Component {
  constructor (props) {
    super(props)
    this.state = { courses: 0, unfinished: 0, index: [] }
  }

  onChangeInputNumber = (value) => {
    console.log(value)
  }

  onClickOpen = (e) => {
    const event = new CustomEvent('openCourse', {
      detail: { interval: 3 }
    })
    window.dispatchEvent(event)
  }

  componentDidMount () {
    const subjectScript = document.createElement('script')
    subjectScript.src = chrome.runtime.getURL('./resources/subject.js')
    document.body.appendChild(subjectScript)
    window.addEventListener('subjectList', ({ detail }) => {
      const { courses, unfinished, index } = detail
      this.setState({ courses, unfinished, index })
    })
  }

  render () {
    return (
      <div>
        <span>检测到{this.state.courses}个课程</span>
        <span>其中{this.state.unfinished}个未完成学习</span>
        <InputNumber
          min={1}
          max={this.state.unfinished}
          onChange={(value) => this.onChangeInputNumber(value)} />
        <Button onClick={(e) => this.onClickOpen(e)}>
          一键打开
        </Button>
      </div>
    )
  }
}

export default Subject
