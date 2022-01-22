import React, { Component } from 'react'
import { Card, Row, Col, Tag, Popconfirm } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars-2'

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
    chrome.storage.sync.get(['subjectList'], ({ subjectList }) => {
      subjectList.reverse()
      this.setState({ subjectList, loading: false })
    })
  }

  render () {
    return (
      <>
        {
          this.state.showPanel &&
          <div className='homeCard'>
            <Card
              title={<span className="cardTitle">最近打开的专题</span>}
              size="small"
              loading={this.state.loading}
              bodyStyle={{ padding: '6px 0px 6px 12px' }} >
              <div className='cardBody'>
                <Scrollbars
                  autoHeight
                  autoHeightMin={10}
                  autoHeightMax={700}
                  width={385}>
                  {
                    this.state.subjectList.length > 0
                      ? this.state.subjectList.map(element => (
                        <div key={element.index} className="subjects">
                          <Row justify="space-around" align="middle" className="rowStyle">
                            <Col span={17}>
                              <span className="subjectTime">{`[${element.date}]`}</span>
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
                              <Popconfirm
                                title="确定移除该专题吗？"
                                onConfirm={() => {
                                  const subjectList = this.state.subjectList.filter(item =>
                                    item.name !== element.name
                                  )
                                  this.setState({ subjectList })
                                  chrome.storage.sync.set({ subjectList })
                                }}
                                onCancel={() => { }}
                                okText="是"
                                cancelText="否"
                              >
                                <Tag
                                  color="#C3272B"
                                  className="subjectButton"
                                >
                                  移除
                                </Tag>
                              </Popconfirm>
                            </Col>
                          </Row>
                        </div>
                      ))
                      : <div className='hintText'>
                          <span>近期学习专题列表为空！</span>
                          <span>😪</span>
                        </div>
                  }
                </Scrollbars>
              </div>
            </Card>
          </div>
        }
      </>
    )
  }
}

export default Home
