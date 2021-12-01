
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AsyncAppLayout, AsyncGoodsIn, AsyncLogin, AsyncPublicLayout } from './App/asyncComponent';
import Login from './Components/Login/Login';
import useToken from './Components/Login/useToken';


import AppContentContainer from './Containers/AppContentContainer';
import PrivateRouter from './Routes/PrivateRouter';
import PublicRoute from './Routes/PublicRoute';

function App() {
  // const {token, setToken} = useToken();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  // return (
  //   <div className="App">
  //     <AppContentContainer />
  //   </div>
  // );

  return (
    <Suspense
      fallback={
        <div>
        </div>
      }
    >
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <PublicRoute
          exact
          path='/login'
          component={AsyncLogin}
          layout={AsyncPublicLayout}
        />

        <PrivateRouter
          exact
          path='/goodsin'
          component={AsyncGoodsIn}
          layout={AsyncAppLayout}
        />

      </Switch>
    </Suspense>
  )
}

export default App;
