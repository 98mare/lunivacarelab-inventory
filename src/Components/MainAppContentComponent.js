import React from 'react'
import { Layout } from 'antd'
import SideNav from '../Components/Common/SideNav'

import {Switch, Route} from "react-router-dom";
import DashBoardContainer from '../Containers/DashBoardContainer'
import styled from 'styled-components'
import Item from '../Components/Item'
import PageHeader from './Common/pageHeader'
import AddItem from './Item/AddItem';
import NavBar from './Common/NavBar';
import GoodsIn from './GoodsIn'
import AddGoods from './GoodsIn/AddGoods';
const { Header, Footer, Sider, Content } = Layout;


const MainAppContentComponent = (props) => {
  // console.log('this is app content props', props)
  return (
    <MainAppContentComponentContainer>
      <Layout className='mainLayout'>
        <Layout>
          <Sider><SideNav></SideNav></Sider>
          <Layout>
          <NavBar></NavBar>
          <Content style={{padding: '20px'}}>
            
            
           
            <Switch>
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
              
              <Route >
                <h4>Error page</h4>
              </Route>
            </Switch>

          </Content>
          </Layout>
        </Layout>
        {/* <Footer >Luniva careLab Inventory</Footer> */}
      </Layout>
    </MainAppContentComponentContainer>
  )
} 

export default MainAppContentComponent

const MainAppContentComponentContainer = styled.div`
  .mainLayout{
    min-height: 100vh;
  }
 
`
