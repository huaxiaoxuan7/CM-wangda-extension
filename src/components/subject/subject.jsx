import React, { Component } from 'react'
import { Row, Col, Card, Tag } from 'antd'
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'

import './subject.scss'

class Subject extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: true, courses: [], unFinished: [] }
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
  }

  render () {
    return (
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
              : '已完成全部课程学习！✌️😁👌'
            : '解析失败，请在页面上进入课程！🤷‍♀️🤷‍♂️'
            }
        </Card>
      </div>
    )
  }
}

export default Subject
