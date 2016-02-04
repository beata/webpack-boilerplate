import { applyMiddleware, compose, createStore } from 'redux'
import { reduxReactRouter } from 'redux-router'
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'

import routes from 'routes'
import reducer from './reducer'

const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({
    routes,
    createHistory: createHashHistory
  })
)(createStore)(reducer)

export default store
