import * as React from 'react'
import App from './components/app'
// import registerServiceWorker from './registerServiceWorker'
import './reboot.css'
import './index.css'

import '@material/button/dist/mdc.button.css'
import '@material/drawer/dist/mdc.drawer.css'
import '@material/grid-list/dist/mdc.grid-list.css'
import '@material/list/dist/mdc.list.css'
import '@material/textfield/dist/mdc.textfield.css'

import 'core-js/es6/promise'
import 'core-js/es6/symbol'
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'core-js/fn/object/assign'

if (process.env.NODE_ENV !== 'production') {
  console.log('NODE_PATH', process.env.NODE_PATH)
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('BASE_API_URL', process.env.BASE_API_URL)
}

function render(Component) {
  React.render(<Component />, document.getElementById('root'))
}

render(App)
// registerServiceWorker()

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept(() => {
    render(App)
  })
}
