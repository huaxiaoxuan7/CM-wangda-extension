import React from 'react'
import Draggable from 'react-draggable'

import Course from './components/course/course'
import Home from './components/home/home.jsx'
import Subject from './components/subject/subject.jsx'

import './panel.scss'

class Panel extends React.Component {
  constructor () {
    super()
    this.state = { type: '' }
  }

  // setPosition = (x, y) => {
  //   this.setState({ positionX: x, positionY: y })
  //   chrome.storage.sync.set({ positionX: x, positionY: y })
  // }

  onPositionChange = ({ x, y }) => {
    if (x > 1700 || y > 890 || x < 0 || y < 0) {
      return false
    }
  }

  // onResetPanelPosition = () => this.setPosition(0, 300)

  componentDidMount () {
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
          defaultPosition = {{ x: 700, y: 200 }}
          onStop = {(x, y) => this.onPositionChange(x, y)}
        >
          {
          this.state.type !== 'Login' &&
            <div className="draggable-root">
            {
              this.state.type === 'Home'
                ? <Home/>
                : this.state.type === 'Subject'
                  ? <Subject/>
                  : <Course/>
            }
          </div>
          }
        </Draggable>
      </div>
    )
  }
}

export default Panel
