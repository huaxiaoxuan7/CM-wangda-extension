import React from 'react'
import ReactDOM from 'react-dom'
import PanelCore from './panelCore.jsx'

const element = document.createElement('div')
element.id = 'appAnchor'
document.body.insertAdjacentElement('afterbegin', element)

chrome.runtime.sendMessage({ type: 'closeTab' })

ReactDOM.render(
     <PanelCore/>,
     document.getElementById('appAnchor')
)
