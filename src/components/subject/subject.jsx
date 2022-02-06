import React, { Component } from 'react'
import { Row, Col, Card, Tag, Switch, Checkbox, message } from 'antd'
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
      computedCourses: [],

      showOptionalCourses: true,

      showPanel: this.props.enable
    }
  }

  componentDidMount () {
    const subjectScript = document.createElement('script')
    subjectScript.src = chrome.runtime.getURL('./resources/subject.js')
    document.body.appendChild(subjectScript)

    // detail: data from subject.js
    window.addEventListener('subjectList', ({ detail: courses }) => {
      this.setState({ loading: false, courses })
      this.computeCourese()
      message.success('网大增强工具：页面解析成功')
    })

    window.addEventListener('subjectName', ({ detail: subjectName }) => {
      this.saveSubjectURL(subjectName)
    })

    setTimeout(() => {
      this.setState({ loading: false })
      message.error('网大增强工具：页面解析失败')
    }, 5000)
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

  computeCourese = () => {
    if (this.state.showOptionalCourses) {
      this.setState({
        computedCourses: this.state.courses
      })
    } else {
      this.setState({
        computedCourses: this.state.courses.filter(item => (!item.isOptional))
      })
    }
  }

  onChangeSwitch = (e) => {
    this.setState({ showOptionalCourses: e }, () => {
      this.computeCourese()
    })
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
                  <div className='extraArea'>
                    <Row justify="space-around" align="middle" gutter={4}>
                      <Col span={8} className="col">
                        <Switch
                          defaultChecked
                          checkedChildren="显示选修课程"
                          unCheckedChildren="不显示选修课程"
                          onChange={this.onChangeSwitch} />
                        {/* <Checkbox onChange={(e) => console.log(e)}>包含选修</Checkbox> */}
                      </Col>
                      <Col span={8}>
                        <Tag
                          color="success"
                          icon={<CheckCircleOutlined />}
                        >已完成：
                          {!this.state.loading
                            ? this.state.computedCourses.filter(item => (!item.isInProgress)).length
                            : '?'}
                        </Tag>
                      </Col>
                      <Col span={8}>
                        <Tag
                          color="error"
                          icon={<CloseCircleOutlined />}
                        >未完成 ：{!this.state.loading
                          ? this.state.computedCourses.filter(item => (item.isInProgress)).length
                          : '?'}
                        </Tag>
                      </Col>
                    </Row>

                  </div>

                </>
              }>
              <>
                <div>

                </div>
                <div className='cardBody'>
                  <Scrollbars
                    autoHeight
                    autoHeightMin={10}
                    autoHeightMax={700}
                    width={385}>
                    {
                      this.state.courses.length >= 1

                        ? this.state.computedCourses.length >= 1
                          ? this.state.computedCourses.map(element => (
                            <div key={element.index} className="courses">
                              <Row justify="space-around" align="middle" className="rowStyle">
                                <Col span={19}>
                                  <span className="courseType">[{element.type}]</span>
                                  <span className="courseName">{element.name}</span>
                                  <span className="courseStatus">{element.isOptional ? '[选修]' : '[必修]'}</span>
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
                            <span>已完成当前专题下全部课程学习!</span>
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
