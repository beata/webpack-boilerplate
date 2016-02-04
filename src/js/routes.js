import { Route, IndexRoute } from 'react-router'

import App from 'containers/app'
import Main from 'containers/main'
import Home from 'containers/home'
import { NotFound } from 'components/error'

const routes = (
  <Route component={App}>
    <Route component={Main}>
      <Route path='/' component={Home} />
      <Route path='*' component={NotFound} />
    </Route>

    {/* not found */}
    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
