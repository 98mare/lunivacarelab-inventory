
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AsyncAddCategory, AsyncAddItems, AsyncAddItemVsRatio, AsyncAddLocation, AsyncAddRack, AsyncAddReports, AsyncAddType, AsyncAddUnits, AsyncAddWastage, AsyncAppLayout, AsyncCategory, AsyncDashbord, AsyncGoodOut, AsyncGoodsIn, AsyncGoodsInAdd, AsyncGoodsOutAdd, AsyncItems, AsyncItemVsRatio, AsyncLocation, AsyncLogin, AsyncNotFound, AsyncPublicLayout, AsyncRack, AsyncReports, AsyncSettings, AsyncType, AsyncUnits, AsyncWastage } from './App/asyncComponent';
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
        <div className='fallback-container'>
        <img src="./assets/images/logo1.png" alt="" />
        </div>
      }
    >
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashbord" />
        </Route>

        <PrivateRouter
          exact
          path='/dashbord'
          component={AsyncDashbord}
          layout={AsyncAppLayout}
        />

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
        <PrivateRouter
          exact
          path='/goodsin/add'
          component={AsyncGoodsInAdd}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/item'
          component={AsyncItems}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/item/add'
          component={AsyncAddItems}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/goodsout'
          component={AsyncGoodOut}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/goodsout/add'
          component={AsyncGoodsOutAdd}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/type'
          component={AsyncType}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/type/add'
          component={AsyncAddType}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/category'
          component={AsyncCategory}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/category/add'
          component={AsyncAddCategory}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/category/edit/:id'
          component={AsyncAddCategory}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/location'
          component={AsyncLocation}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/location/add'
          component={AsyncAddLocation}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/rack'
          component={AsyncRack}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/rack/add'
          component={AsyncAddRack}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/wastage'
          component={AsyncWastage}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/wastage/add'
          component={AsyncAddWastage}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/itemvsratio'
          component={AsyncItemVsRatio}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/itemvsratio/add'
          component={AsyncAddItemVsRatio}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/reports'
          component={AsyncReports}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/reports/add'
          component={AsyncAddReports}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/settings'
          component={AsyncSettings}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/units'
          component={AsyncUnits}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/units/add'
          component={AsyncAddUnits}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/units/edit/:id'
          component={AsyncAddUnits}
          layout={AsyncAppLayout}
          forEdit
        />

        <Route component={AsyncNotFound} />

      </Switch>
    </Suspense>
  )
}

export default App;
