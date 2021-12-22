import React, { Component } from 'react'
import { Button, Card, Row, Col } from 'antd'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { }
  }

  componentDidMount () {
    chrome.storage.sync.get(['subjectList'], res => console.log(res))
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
