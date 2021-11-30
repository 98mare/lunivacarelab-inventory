import React from 'react'
import { useHistory } from 'react-router-dom'
import {Route} from "react-router-dom";
import DashBoardContainer from '../Containers/DashBoardContainer'
import styled from 'styled-components'
import Item from '../Components/Item'
import AddItem from '../Components/Item/AddItem';
import GoodsIn from '../Components/GoodsIn'
import AddGoods from '../Components/GoodsIn/AddGoods';
import ErrorPage from '../Components/Common/ErrorPage';
import Type from '../Components/Type'
import AddType from '../Components/Type/AddType';
import Category from '../Components/Category'
import AddCategory from '../Components/Category/AddCategory';
import Location from '../Components/Location'
import AddLocation from '../Components/Location/AddLocation';
import Rack from '../Components/Rack'
import AddRack from '../Components/Rack/AddRack';
import Wastage from '../Components/Wastage'
import AddWastage from '../Components/Wastage/AddWastage';

const PrivateRoute = (props) => {
  const history = useHistory();
  return (
      <>
      <Route path='/' exact>
        <DashBoardContainer />
      </Route>
      <Route path='/item' exact>
        <Item />
      </Route>
      <Route path='/item/add' exact>
        <AddItem />
      </Route>
      <Route path='/goodsin' exact>
        <GoodsIn></GoodsIn>
      </Route>
      <Route path='/goodsin/add' exact>
        <AddGoods/>
      </Route>

      <Route path='/type' exact>
        <Type/>
      </Route>
      <Route path='/type/add' exact>
        <AddType/>
      </Route>

      <Route path='/category' exact>
        <Category/>
      </Route>
      <Route path='/category/add' exact>
        <AddCategory/>
      </Route>

      <Route path='/location' exact>
        <Location/>
      </Route>
      <Route path='/location/add' exact>
        <AddLocation/>
      </Route>

      <Route path='/rack' exact>
        <Rack/>
      </Route>
      <Route path='/rack/add' exact>
        <AddRack/>
      </Route>


      <Route path='/wastage' exact>
        <Wastage/>
      </Route>
      <Route path='/wastage/add' exact>
        <AddWastage/>
      </Route>
      
      {/* <Route path=''>
        <ErrorPage></ErrorPage>
      </Route> */}
              
      </>
  )
}

export default PrivateRoute
