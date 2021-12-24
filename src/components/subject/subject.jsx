import React, { Component } from 'react'
import { Row, Col, Card, Tag } from 'antd'
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'

import './subject.scss'

class Subject extends Component {
  static propTypes = {
    enable: Boolean
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      courses: [],
      unFinished: [],
      showPanel: this.props.enable
    }
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
        unFinished: courses.filter(item => (item.isInProgress))
      })
    })

    window.addEventListener('subjectName', ({ detail: subjectName }) => {
      this.saveSubjectURL(subjectName)
    })

    setTimeout(() => {
      this.setState({ loading: false })
    }, 5000)
  }

  saveSubjectURL (subjectName) {
    chrome.storage.sync.get(['subjectList'], ({ subjectList }) => {
      const url = document.location.toString()
      const find = subjectList.find(element => element.name === subjectName)
      if (!find) {
        subjectList.push({ name: subjectName, url })
        chrome.storage.sync.set({ subjectList }, () => { })
      }
    })
  }

  render () {
    return (
      <div>
        {
          this.state.showPanel &&
          <div className="subjectCard">
            <Card
              title="专题"
              size="small"
              loading={this.state.loading}
              extra={
                <div>
                  <Tag
                    color="success"
                    icon={<CheckCircleOutlined />}
                  >已完成：
                    {!this.state.loading ? this.state.courses.filter(item => (!item.isInProgress)).length : '?'}
                  </Tag>
                  <Tag
                    color="error"
                    icon={<SyncOutlined spin />}
                  >未完成 ：{!this.state.loading ? this.state.unFinished.length : '?'}
                  </Tag>
                </div>
              }>
              {
                this.state.courses.length >= 1
                  ? this.state.unFinished.length >= 1
                    ? this.state.unFinished.map(element => (
                      <div key={element.index} className="courses">
                        <Row justify="space-around" align="middle" className="rowStyle">
                          <Col span={18}>
                            <span className="courseType">[{element.type}]</span>
                            <span className="courseName">{element.name}</span>
                            <span className="courseStatus">{!element.isCompulsory ? '[选修]' : null}</span>
                          </Col>
                          <Col span={5} offset={1}>
                            <Tag
                              color="#108ee9"
                              className="courseButton"
                              onClick={() => {
                                const event = new CustomEvent('openCourse', { detail: { pointer: element.index } })
                                window.dispatchEvent(event)
                              }}
                            >
                              {element.action}
                            </Tag>
                          </Col>
                        </Row>
                      </div>
                    ))
                    : <div className='hintText'><span>已完成当前专题下全部课程学习!</span><span>✌️😁👌</span></div>
                  : <div className='hintText'><span>解析失败，请在页面上手动进入课程！</span><span>😥🥲</span></div>
              }
            </Card>
          </div>
        }
      </div>
    )
  }
}

export default Subject
