import React, { Component } from 'react'
import { Button, Card, Tag } from 'antd'

class Subject extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: true, courses: [], unFinished: [] }
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

    // detail: data from subject.js
    window.addEventListener('subjectList', ({ detail: courses }) => {
      this.setState({
        loading: false,
        courses,
        unFinished: courses.filter(item => (item.isInProgress && item.isCompulsory))
      })
    })
  }

  render () {
    return (
      <div>
        <Card
          title="专题"
          size="small"
          loading={this.state.loading}
          extra={
            <div>
              <Tag color="success">已完成 {!this.state.loading ? this.state.courses.filter(item => (!item.isInProgress && item.isCompulsory)).length : '?'}</Tag>
              <Tag color="error">未完成 {!this.state.loading ? this.state.unFinished.length : '?'}</Tag>
              <Tag color="warning">选修 {!this.state.loading ? this.state.courses.filter(item => (!item.isCompulsory)).length : '?'}</Tag>
            </div>
          }>
          {this.state.unFinished.map((element) => (
            <div key={element.name}>
              <span> {element.name}</span>
              <Button
              type='primary'
              size='small'
              onClick={() => {
                const event = new CustomEvent('openCourse', { detail: { pointer: element.index } })
                window.dispatchEvent(event)
              }}
              >学习</Button>
            </div>

          ))}
        </Card>
      </div>)
  }
}

export default Subject
