import React, { Component } from 'react'
import { Card, Row, Col, Tag } from 'antd'

import './home.scss'

class Home extends Component {
  static propTypes = {
    enable: Boolean
  }

  constructor (props) {
    super(props)
    this.state = {
      subjectList: [],
      loading: true,
      showPanel: this.props.enable
    }
  }

  componentDidMount () {
    const homeScript = document.createElement('script')
    homeScript.src = chrome.runtime.getURL('./resources/home.js')
    document.body.appendChild(homeScript)

    chrome.storage.sync.get(['subjectList'], ({ subjectList }) => {
      this.setState({ subjectList, loading: false })
    })
  }

  render () {
    return (
      <div>
        {
          this.state.showPanel &&
          <div className='homeCard'>
            <Card
              title="最近学习的专题"
              size="small"
              loading={this.state.loading}
              extra={
                <div></div>
              }>
              {
                this.state.subjectList.length > 0
                  ? this.state.subjectList.map((element, index) => (
                    <div key={element.index} className="subjects">
                      <Row justify="space-around" align="middle" className="rowStyle">
                        <Col span={17}>
                          <span className="subjectName">{element.name}</span>
                        </Col>
                        <Col span={3} offset={1}>
                          <Tag
                            color="#108ee9"
                            className="subjectButton"
                            onClick={() => {
                              chrome.runtime.sendMessage({
                                greeting: JSON.stringify({
                                  action: 'open_tab',
                                  url: element.url
                                })
                              })
                            }}
                          >
                            打开
                          </Tag>
                        </Col>
                        <Col span={3}>
                          <Tag
                            color="#f50"
                            className="subjectButton"
                            onClick={() => {
                              const subjectList = this.state.subjectList.filter(item =>
                                item.name !== element.name
                              )
                              this.setState({ subjectList })
                              chrome.storage.sync.set({ subjectList })
                            }}
                          >
                            删除
                          </Tag>
                        </Col>
                      </Row>
                    </div>
                  ))
                  : '没有近期学习的专题了！😏'
              }
            </Card>
          </div>
        }
      </div>
    )
  }
}

export default Home
