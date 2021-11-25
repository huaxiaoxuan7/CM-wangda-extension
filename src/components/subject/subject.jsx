import React, { Component } from 'react'
import { InputNumber, Card, Tag, Tabs, Row, Col } from 'antd'
const { TabPane } = Tabs

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
            {this.state.courses.map((element) => (<p key={element.name}> {element.name}</p>))}
          {/* <Row>
            <Tabs defaultActiveKey="1" tabPosition="left">
              <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
          </Row> */}
        </Card>

        <InputNumber
          min={1}
          max={this.state.unfinished}
          onChange={(value) => this.onChangeInputNumber(value)} />
        {/* <Button onClick={(e) => this.onClickOpen(e)}>
          一键打开
        </Button> */}
      </div>)
  }
}

export default Subject
