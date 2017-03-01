require('es6-promise').polyfill()

import * as React from 'react'
import { render } from 'react-dom'

const { AppContainer } = require('react-hot-loader')

import App from 'containers/App'

declare var module: { hot: any }

const rootEl = document.getElementById('app')

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
)

// Handle hot reloading actions from Webpack
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootEl
    )
  })
}
