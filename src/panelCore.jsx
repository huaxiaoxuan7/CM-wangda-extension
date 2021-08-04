import React from 'react'
import Draggable from 'react-draggable'
import './panelCore.scss'

class Panel extends React.Component {
  constructor () {
    super()
    this.defaultPositionX = 0
    this.defaultPositionY = 0
    chrome.storage.local.get(['panelPositionX', 'panelPositionY'], ({ panelPositionX, panelPositionY }) => {
      this.defaultPositionX = panelPositionX
      this.defaultPositionY = panelPositionY
    })
  }

  onPositionChange (x, y) {
    chrome.storage.local.set({ panelPositionX: x, panelPositionY: y }, () => { })
  }

  componentDidMount () {
    chrome.runtime.sendMessage({ type: 'closeTab' })
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
          <h1>NM$L</h1>
        </div>
      </Draggable>
    )
  }
}

export default Panel
