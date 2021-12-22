import React, { Component } from 'react'
import { Button, Card, Row, Col } from 'antd'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { }
  }

  componentDidMount () {
    chrome.storage.local.get(['panelPositionX', 'panelPositionY'], ({ panelPositionX, panelPositionY }) => {
      this.defaultPositionX = panelPositionX
      this.defaultPositionY = panelPositionY
    })
  }

  render () {
    return (
      <div className='homeCard'>
      <Card
          title="主页"
          size="small"
          loading={this.state.loading}
          extra={
            <div></div>
          }>

          </Card>
      </div>
    )
  }
}

export default Home
