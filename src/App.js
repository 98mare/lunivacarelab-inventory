
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AsyncAddCategory, AsyncAddConsumptionGroup, AsyncAddConsumptionLookGroup, AsyncAddItems, AsyncAddItemVsRatio, AsyncAddLocation, AsyncAddRack, AsyncAddType, AsyncAddUnits, AsyncAddWastage, AsyncAppLayout, AsyncCategory, AsyncConsumableReports, AsyncConsumptionIndex, AsyncConsumptionLookIndex, AsyncDashbord, AsyncGoodOut, AsyncGoodsIn, AsyncGoodsInAdd, AsyncGoodsInReports, AsyncGoodsOutAdd, AsyncGoodsOutReports, AsyncInOutConReports, AsyncinvsReports, AsyncItems, AsyncItemVsRatio, AsyncLocation, AsyncLocationStockReport, AsyncLogin, AsyncMinQuantityReport, AsyncNotFound, AsyncPublicLayout, AsyncRack, AsyncReports, AsyncSettings, AsyncStocks, AsyncType, AsyncUnits, AsyncWastage } from './App/asyncComponent';
import PrivateRouter from './Routes/PrivateRouter';
import PublicRoute from './Routes/PublicRoute';
import loadlogo from './assets/images/logo1.png';

function App() {
  return (
    <Suspense
      fallback={
        <div className='fallback-container'>
          <img src={loadlogo} alt="" />
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
          path='/goodsin/edit/:id/:from'
          component={AsyncGoodsInAdd}
          layout={AsyncAppLayout}
          forEdit
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
          path='/item/edit/:id/:typeId/:cateId'
          component={AsyncAddItems}
          layout={AsyncAppLayout}
          forEdit
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
          path='/goodsout/edit/:id/:from'
          component={AsyncGoodsOutAdd}
          layout={AsyncAppLayout}
          forEdit
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
          path='/type/edit/:id'
          component={AsyncAddType}
          layout={AsyncAppLayout}
          forEdit
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
          forEdit
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
          path='/location/edit/:id'
          component={AsyncAddLocation}
          layout={AsyncAppLayout}
          forEdit
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
          path='/rack/edit/:locate/:id'
          component={AsyncAddRack}
          layout={AsyncAppLayout}
          forEdit
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
          path='/wastage/edit/:id/:from'
          component={AsyncAddWastage}
          layout={AsyncAppLayout}
          forEdit
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
          path='/itemvsratio/eidt/:id'
          component={AsyncAddItemVsRatio}
          layout={AsyncAppLayout}
          forEdit
        />

        <PrivateRouter
          exact
          path='/reports'
          component={AsyncReports}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/reports/goodsin'
          component={AsyncGoodsInReports}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/reports/goodsout'
          component={AsyncGoodsOutReports}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/reports/consumption'
          component={AsyncConsumableReports}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/reports/invs'
          component={AsyncinvsReports}
          layout={AsyncAppLayout}
        />
        <PrivateRouter
          exact
          path='/reports/inoutcon'
          component={AsyncInOutConReports}
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

        <PrivateRouter
          exact
          path='/reports/stocks'
          component={AsyncStocks}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/reports/minquantityreport'
          component={AsyncMinQuantityReport}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/reports/locationstockreport'
          component={AsyncLocationStockReport}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/consumption'
          component={AsyncConsumptionIndex}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/consumption/add'
          component={AsyncAddConsumptionGroup}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/consumption/edit/:id'
          component={AsyncAddConsumptionGroup}
          layout={AsyncAppLayout}
          forEdit
        />

        <PrivateRouter
          exact
          path='/consumptionlook'
          component={AsyncConsumptionLookIndex}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/consumptionlook/add'
          component={AsyncAddConsumptionLookGroup}
          layout={AsyncAppLayout}
        />

        <PrivateRouter
          exact
          path='/consumptionlook/edit/:id'
          component={AsyncAddConsumptionLookGroup}
          layout={AsyncAppLayout}
          forEdit
        />

        <Route component={AsyncNotFound} />

      </Switch>
    </Suspense>
  )
}

export default App;