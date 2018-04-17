import * as React from 'react'
import App from './components/app'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import './reboot.css'
import './index.css'

import '@material/ripple/dist/mdc.ripple.css'
import '@material/theme/dist/mdc.theme.css'
import '@material/toolbar/dist/mdc.toolbar.css'

import 'core-js/es6/promise'
import 'core-js/es6/symbol'
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'core-js/fn/object/assign'

function render(Component) {
  React.render(<Component />, document.getElementById('root'))
}

console.log('Time to render this app!')
render(App)

OfflinePluginRuntime.install({
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating')
  },
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady')
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated')
    // Reload the webpage to load into the new version
    window.location.reload()
  },

  onUpdateFailed: () => {
    console.log('SW Event:', 'onUpdateFailed')
  }
})

require('preact/devtools')
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept(() => {
    render(App)
  })
}
