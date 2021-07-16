import React from 'react'
import ReactDOM from 'react-dom'
import PanelCore from './panelCore.jsx'

const element = document.createElement('div')
element.id = 'appAnchor'
document.body.insertAdjacentElement('afterbegin', element)

ReactDOM.render(
     <PanelCore/>,
     document.getElementById('appAnchor')
)
