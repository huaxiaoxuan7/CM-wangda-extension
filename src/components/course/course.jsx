import React, { Component } from 'react'
import { Row, Col, Card, Statistic, Tag } from 'antd'
import { FieldTimeOutlined, VideoCameraOutlined, FilePdfOutlined, RedoOutlined, CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'

import './course.scss'

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: false, diff: 0, timeText: '', videoCount: 0, fileCount: 0, pauseCount: 0, finishFlag: false }
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
    })
  }

  render () {
    return (
      <div className="courseCard">
        <Card
          title="课程"
          size="small"
          loading={this.state.loading}
          extra={
            <div>
              {this.state.finishFlag
                ? <Tag
                  color="success"
                  icon={<CheckCircleOutlined />}
                >已完成</Tag>
                : <Tag
                  color="error"
                  icon={<SyncOutlined spin />}
                >未完成</Tag>
              }
            </div>
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
                title="恢复播放"
                value={this.state.pauseCount}
                prefix={<RedoOutlined />}
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
            ? <div className='hintText'> {'已完成当前页面所有课程，可以关闭本页面✌️😁👌'}</div>
            : null}
        </Card>
      </div>)
  }
}

export default Course
