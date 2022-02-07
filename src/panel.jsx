import React from 'react'
import Draggable from 'react-draggable'

import Course from './components/course/course'
import Home from './components/home/home.jsx'
import Subject from './components/subject/subject.jsx'

import './panel.scss'

class Panel extends React.Component {
  constructor () {
    super()
    this.state = { type: '', settings: [], currentUrl: '' }
  }

  onPositionChange = ({ x, y }) => {
    if (x > 1700 || y > 890 || x < 0 || y < 0) {
      return false
    }
  }

  updatePanel = () => {
    const routerParams = document.URL.split('/')
    if (this.state.currentUrl !== routerParams[4]) {
      if (routerParams[4] === '#login') {
        this.setState({ type: 'Login' })
      } else if (routerParams[4] === 'home' && routerParams[5] === undefined) {
        this.setState({ type: 'Home' })
      } else if (routerParams[4] === 'study' && routerParams[6] === 'detail') {
        if (routerParams[5] === 'subject') {
          this.setState({ type: 'Subject' })
        } else if (routerParams[5] === 'course') {
          this.setState({ type: 'Course' })
        } else {
          this.setState({ type: 'hide' })
        }
      } else {
        this.setState({ type: 'hide' })
      }
    }
    this.setState({ currentUrl: routerParams[4] })
  }

  componentDidMount () {
    chrome.storage.sync.get(['settings'], ({ settings }) => {
      this.setState({ settings: settings })
    })
    this.updatePanel()
    document.onclick = () => this.updatePanel()
    const root = document.getElementsByClassName('draggable-root')[0]
    root.onmousedown = () => { root.style.cursor = '-webkit-grabbing' }
    root.onmouseup = () => { root.style.cursor = '-webkit-grab' }

    chrome.runtime.sendMessage({
      payload: JSON.stringify({ action: 'on_load' })
    })
  }

  render () {
    return (
      <Draggable
        defaultPosition={{ x: 900, y: 110 }}
        onStop={(x, y) => this.onPositionChange(x, y)}
      >
        {
          this.state.type !== 'Login' &&
          <div className="draggable-root">
            <div className='box'>
              {
                this.state.settings.length > 0 &&
                <>
                  {
                    this.state.type === 'Home' &&
                    <Home enable={this.state.settings[3].value} />
                  }
                  {
                    this.state.type === 'Subject' &&
                    <Subject enable={this.state.settings[4].value} />
                  }
                  {
                    this.state.type === 'Course' &&
                    <Course
                      enable={this.state.settings[5].value}
                      settings={this.state.settings.slice(0, 3)} />
                  }
                </>
              }

            </div>
          </div>
        }
      </Draggable>
    )
  }
}

export default Panel
