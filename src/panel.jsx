import React from 'react'
import Draggable from 'react-draggable'

import Course from './components/course/course'
import Home from './components/home/home.jsx'
import Subject from './components/subject/subject.jsx'

import './panel.scss'

class Panel extends React.Component {
  constructor () {
    super()
    this.state = { type: '', settings: [] }
  }

  onPositionChange = ({ x, y }) => {
    if (x > 1700 || y > 890 || x < 0 || y < 0) {
      return false
    }
  }

  componentDidMount () {
    chrome.storage.sync.get(['settings'], ({ settings }) => {
      this.setState({ settings: settings })
    })

    // 有更好的办法监测地址栏变化吗?😪
    if (document.URL.split('/')[4] === '#login') {
      this.setState({ type: 'Login' })
    } else if (document.URL.split('/')[4] === 'home') {
      this.setState({ type: 'Home' })
    } else if (document.URL.split('/')[4] === 'study' && document.URL.split('/')[5] === 'subject') {
      this.setState({ type: 'Subject' })
    } else if (document.URL.split('/')[4] === 'study' && document.URL.split('/')[5] === 'course') {
      this.setState({ type: 'Course' })
    }
  }

  render () {
    return (
      <div>
        <Draggable
          defaultPosition = {{ x: 1200, y: 200 }}
          onStop = {(x, y) => this.onPositionChange(x, y)}
        >
          {
          this.state.type !== 'Login' &&
            <div className="draggable-root">
            {
              this.state.type === 'Home'
                ? <div>{this.state.settings.length > 0 &&
                   <Home enable={this.state.settings[3].value}/>}</div>
                : this.state.type === 'Subject'
                  ? <div>{this.state.settings.length > 0 &&
                     <Subject enable={this.state.settings[4].value}/>}</div>
                  : this.state.type === 'Course'
                    ? <div>{this.state.settings.length > 0 &&
                       <Course
                       enable={this.state.settings[5].value}
                       settings={this.state.settings.slice(0, 3)}
                       />}</div>
                    : null
            }
          </div>
          }
        </Draggable>
      </div>
    )
  }
}

export default Panel
