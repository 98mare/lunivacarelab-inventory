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
              
              {/* <Route path=''>
                <ErrorPage></ErrorPage>
              </Route> */}
              
      </>
  )
}

export default PrivateRoute
