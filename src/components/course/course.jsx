import React, { Component } from 'react'
import { Row, Col, Card, Statistic, Tag } from 'antd'
import { FieldTimeOutlined, VideoCameraOutlined, FilePdfOutlined, RedoOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import './course.scss'

class Course extends Component {
  static propTypes = {
    enable: Boolean,
    settings: Array
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      diff: 0,
      timeText: '',
      videoCount: 0,
      fileCount: 0,
      pauseCount: 0,
      finishFlag: false,
      showPanel: this.props.enable,
      courseEnhanced: this.props.settings[0].value,
      autoMuted: this.props.settings[1].value,
      autoClose: this.props.settings[2].value
    }
  }

  componentDidMount () {
    const startTime = Date.now()
    setInterval(() => {
      const diff = (Date.now() - startTime) / 1e3
      this.setState({
        timeText: `${Math.floor(diff / 60 / 60 / 24)}天${Math.floor(diff / 60 / 60) % 24}小时${Math.floor(diff / 60) % 60}分${Math.floor(diff % 60)}秒`
      })
    }, 1000)

    const courseScript = document.createElement('script')
    courseScript.src = chrome.runtime.getURL('./resources/course.js')
    document.body.appendChild(courseScript)

    window.addEventListener('preventPause', () => {
      this.setState({ pauseCount: this.state.pauseCount + 1 })
    })

    window.addEventListener('fileFinished', () => {
      this.setState({ fileCount: this.state.fileCount + 1 })
    })

    window.addEventListener('videoFinished', () => {
      this.setState({ videoCount: this.state.videoCount + 1 })
    })

    window.addEventListener('allFinished', () => {
      this.setState({ finishFlag: true })
      if (this.state.autoClose) {
        setTimeout(() => {
          chrome.runtime.sendMessage({
            greeting: JSON.stringify({
              action: 'close_tab'
            })
          })
        }, 5e3)
      }
    })

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('settingsLoaded', {
        detail: {
          courseEnhanced: this.state.courseEnhanced,
          autoMuted: this.state.autoMuted
        }
      }))
    }, 1000)
  }

  render () {
    return (
      <>
        {
          this.state.showPanel &&
          <div className="courseCard">
            <Card
              title={<span className="cardTitle">{`课程[${this.state.courseEnhanced ? '助力中' : '未助力'}]`}</span>}
              size="small"
              loading={this.state.loading}
              extra={
                <>
                  {this.state.finishFlag
                    ? <Tag
                      color="success"
                      icon={<CheckCircleOutlined />}
                    >已完成</Tag>
                    : <Tag
                      color="error"
                      icon={<CloseCircleOutlined />}
                    >未完成</Tag>
                  }
                </>
              }>
              <Row justify="space-around" align="middle" className="rowStyle">
                <Col span={8}>
                  <Statistic
                    title="完成视频"
                    value={this.state.videoCount}
                    prefix={<VideoCameraOutlined />}
                    valueStyle={{ fontSize: '16px' }}
                  >
                  </Statistic>
                </Col>

                <Col span={8}>
                  <Statistic
                    title="完成文档"
                    value={this.state.fileCount}
                    prefix={<FilePdfOutlined />}
                    valueStyle={{ fontSize: '16px' }}
                  >
                  </Statistic>
                </Col>

                <Col span={8}>
                  <Statistic
                    title="恢复播放"
                    value={this.state.pauseCount}
                    prefix={<RedoOutlined />}
                    valueStyle={{ fontSize: '16px' }}
                  >
                  </Statistic>
                </Col>

              </Row>
              <Row justify="space-around" align="middle" className="rowStyle">
                <Col span={24}>
                </Col>
              </Row>
              <Statistic
                title="本次已学习"
                value={this.state.timeText}
                prefix={<FieldTimeOutlined />}
                valueStyle={{ fontSize: '16px' }}
              >
              </Statistic>
              {this.state.finishFlag
                ? <div className='hintText'>
                  {
                    this.state.autoClose
                      ? <span>已完成当前页面所有课程，即将关闭本页面！</span>
                      : <span>已完成当前页面所有课程，可以关闭本页面！</span>
                  }
                    <span>✌️😏👌</span>
                  </div>
                : null}
            </Card>
          </div>
        }
      </>
    )
  }
}

export default Course
