import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

import routes from 'routes'
import store from 'ducks/store'

const Root = () => {
  return (
    <Provider store={store}>
      <ReduxRouter>
        {routes}
      </ReduxRouter>
    </Provider>
  )
}

export default Root
