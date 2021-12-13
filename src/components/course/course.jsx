import React, { Component } from 'react'

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = { }
  }

  componentDidMount () {
    const fileScript = document.createElement('script')
    fileScript.src = chrome.runtime.getURL('./resources/file.js')
    document.body.appendChild(fileScript)
    const videoScript = document.createElement('script')
    videoScript.src = chrome.runtime.getURL('./resources/video.js')
    document.body.appendChild(videoScript)
  }

  render () {
    return (
      <div>
        <div>nmsl</div>
            <h3>course</h3>
      </div>
    )
  }
}

export default Course
