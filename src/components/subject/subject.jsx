import React, { Component } from 'react'
import { Row, Col, Card, Tag, Checkbox } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars-2'

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
      statistics: {
        finished: undefined,
        finishedNotOptional: undefined,
        unfinished: undefined,
        unfinishedOptional: undefined
      },
      computedCourses: [],
      courseFilter: ['notOptional', 'isInProgress', 'knowledge'],
      showPanel: this.props.enable
    }
  }

  componentDidMount () {
    const subjectScript = document.createElement('script')
    subjectScript.src = chrome.runtime.getURL('./resources/subject.js')
    document.body.appendChild(subjectScript)

    // detail: data from subject.js
    window.addEventListener('subjectList', ({ detail: courses }) => {
      this.setState({ loading: false, courses }, () => {
        const optional = this.state.courses.filter(item => item.isOptional)
        const notOptional = this.state.courses.filter(item => !item.isOptional)
        this.setState({
          statistics: {
            finished: this.state.courses.filter(item => !item.isInProgress).length,
            finishedNotOptional: notOptional.filter(item => (!item.isInProgress)).length,
            unfinished: this.state.courses.filter(item => item.isInProgress).length,
            unfinishedOptional: optional.filter(item => (item.isInProgress)).length
          }
        })
      })
      this.computeCourese(this.state.courseFilter)
    })

    window.addEventListener('subjectName', ({ detail: subjectName }) => {
      this.saveSubjectURL(subjectName)
    })

    setTimeout(() => this.setState({ loading: false }), 5000)
  }

  saveSubjectURL (subjectName) {
    chrome.storage.sync.get(['subjectList'], ({ subjectList }) => {
      const url = document.location.toString()
      const find = subjectList.find(element => element.name === subjectName)
      const date = new Date().toLocaleDateString()
      if (!find) {
        subjectList.push({ name: subjectName, url, date })
        chrome.storage.sync.set({ subjectList })
      }
    })
  }

  computeCourese = courseFilter => {
    let temp = this.state.courses
    if (courseFilter.some(element => (element === 'notOptional'))) {
      // 只显示必修
      temp = temp.filter(course => (!course.isOptional))
    }
    if (courseFilter.some(element => element === 'isInProgress')) {
      // 只显示未完成
      temp = temp.filter(course => (course.isInProgress))
    }
    if (!courseFilter.some(element => element === 'knowledge')) {
      // 不包含知识、URL
      temp = temp.filter(course => (course.type !== '知识'))
      temp = temp.filter(course => (course.type !== '专题'))
      temp = temp.filter(course => (course.type !== 'URL'))
    }
    this.setState({ computedCourses: temp })
  }

  render () {
    return (
      <>
        {
          this.state.showPanel &&
          <div className="subjectCard">
            <Card
              title={<span className="cardTitle">专题</span>}
              size="small"
              loading={this.state.loading}
              bodyStyle={{ padding: '6px 0px 6px 12px' }}
              extra={
                <>
                  <Tag
                    color="success"
                    icon={<CheckCircleOutlined />}
                  >
                    <span>已完成</span>
                    {
                      !this.state.loading
                        ? <>
                          <span>{this.state.statistics.finished}</span>
                          <span>{`（必修${this.state.statistics.finishedNotOptional}）`}</span>
                        </>
                        : '?'
                    }
                  </Tag>
                  <Tag
                    color="error"
                    icon={<CloseCircleOutlined />}
                  >
                    <span>未完成</span>
                    {
                      !this.state.loading
                        ? <>
                          <span>{this.state.statistics.unfinished}</span>
                          <span>{`（选修${this.state.statistics.unfinishedOptional}）`}</span>
                        </>
                        : '?'
                    }
                  </Tag>
                </>
              }>
              <>
                <div className='cardBody'>
                  <Scrollbars
                    autoHeight
                    autoHeightMin={10}
                    autoHeightMax={700}
                    width={385}>
                    <div className='control'>
                      <Checkbox.Group
                        onChange={checkedValues => this.computeCourese(checkedValues)}
                        className="row"
                        defaultValue={this.state.courseFilter}
                      >
                        <Row justify="space-around" align="middle" gutter={4}>
                          <Col span={7} className="col">
                            <Checkbox value="notOptional">只显示必修</Checkbox>
                          </Col>
                          <Col span={7} className="col">
                            <Checkbox value="isInProgress">只显示未完成</Checkbox>
                          </Col>
                          <Col span={10} className="col">
                            <Checkbox value="knowledge">显示专题、知识、URL</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </div>
                    {
                      this.state.courses.length >= 1
                        ? this.state.computedCourses.length >= 1
                          ? this.state.computedCourses.map((element, index) => (
                            <div key={element.index} className="courses">
                              <Row justify="space-around" align="middle" className="rowStyle">
                                <Col span={19}>
                                  <span>{index + 1}.</span>
                                  <span className="courseStatus">{element.isOptional ? '[选修]' : '[必修]'}</span>
                                  <span className="courseType">[{element.type}]</span>
                                  <span className="courseName">{element.name}</span>
                                </Col>
                                <Col span={4} offset={1}>
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
                          : <div className='hintText'>
                            <span>已完成当前筛选条件下全部课程学习!</span>
                            <span>✌️😁👌</span>
                          </div>

                        : <div className='hintText'><span>解析失败，请在页面上手动进入课程！</span>
                          <span>😥🥲</span>
                        </div>
                    }
                  </Scrollbars>
                </div>
              </>
            </Card>
          </div>
        }
      </>
    )
  }
}

export default Subject
