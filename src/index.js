import React from 'react'
import ReactDOM from 'react-dom'

import Panel from './panel.jsx'

const element = document.createElement('div')
element.id = 'appAnchor'
document.body.insertAdjacentElement('afterbegin', element)

ReactDOM.render(
     <Panel/>,
     document.getElementById('appAnchor')
)
