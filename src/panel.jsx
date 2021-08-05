import React, { Component } from 'react'
import Draggable from 'react-draggable'

import Course from './components/course/course'
import Home from './components/home/home.jsx'
import Subject from './components/subject/subject.jsx'

import './panel.scss'

class Panel extends Component {
  constructor () {
    super()
    this.defaultPositionX = 0
    this.defaultPositionY = 0
    chrome.storage.local.get(['panelPositionX', 'panelPositionY'], ({ panelPositionX, panelPositionY }) => {
      this.defaultPositionX = panelPositionX
      this.defaultPositionY = panelPositionY
    })
    this.state = { type: '' }
  }

  onPositionChange (x, y) {
    chrome.storage.local.set({ panelPositionX: x, panelPositionY: y }, () => { })
  }

  componentDidMount () {
    // chrome.runtime.sendMessage({ type: '0' })
    if (document.URL.split('/')[4] === 'home') {
      this.setState({ type: 'Home' })
    } else if (document.URL.split('/')[4] === 'study' && document.URL.split('/')[5] === 'subject') {
      this.setState({ type: 'Subject' })
    } else if (document.URL.split('/')[4] === 'study' && document.URL.split('/')[5] === 'course') {
      this.setState({ type: 'Course' })
    }
  }

  render () {
    return (
      <Draggable
        // position = {{ x: this.state.positionX, y: this.state.positionY }}
        defaultPosition = {{ x: this.defaultPositionX, y: this.defaultPositionY }}
        onStop = {({ x, y }) => this.onPositionChange(x, y)}
        // grid={[1, 1]}
      >
        <div className="panelWrapper">
          {
            this.state.type === 'Home'
              ? <Home/>
              : this.state.type === 'Subject'
                ? <Subject/>
                : <Course/>
          }
        </div>
      </Draggable>
    )
  }
}

export default Panel
