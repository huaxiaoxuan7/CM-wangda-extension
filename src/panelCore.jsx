import React from 'react'
import Draggable from 'react-draggable'
import './panelCore.scss'

class Panel extends React.Component {
  constructor () {
    super()
    this.defaultPositionX = 0
    this.defaultPositionY = 0
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(['panelPositionX', 'panelPositionY'], ({ panelPositionX, panelPositionY }) => {
      console.log(1111)
      this.defaultPositionX = panelPositionX
      this.defaultPositionY = panelPositionY
    })
  }

  onPositionChange (x, y) {
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ panelPositionX: x, panelPositionY: y }, () => { })
  }

  render () {
    console.log('sd')
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
