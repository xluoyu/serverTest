import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Login from './views/Login'
import Base from './views/Base'
const Login = React.lazy(() => import('./views/Login/index'))

function App() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <Router>
          <Switch>
            <Route path="/" exact component={Base}></Route>
            <Route path="/cart" exact component={Base}></Route>
            <Route path="/my" exact component={Base}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </Suspense>
    </div>
  )
}

export default App