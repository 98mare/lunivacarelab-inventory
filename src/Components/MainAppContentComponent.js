import React from 'react'
import { Layout } from 'antd'
import SideNav from '../Components/Common/SideNav'

import {Switch, Route} from "react-router-dom";
import DashBoardContainer from '../Containers/DashBoardContainer'
import styled from 'styled-components'
import Item from '../Components/Item'
import AddItem from './Item/AddItem';
import NavBar from './Common/NavBar';
import GoodsIn from './GoodsIn'
import AddGoods from './GoodsIn/AddGoods';
import ErrorPage from './Common/ErrorPage';
import Type from '../Components/Type'
import PrivateRoute from '../Routes/PrivateRoute';
const { Header, Footer, Sider, Content } = Layout;


const MainAppContentComponent = (props) => {
  // console.log('this is app content props', props)
  return (
    <MainAppContentComponentContainer>
      <Layout className='mainLayout'>
        <Layout>
          <Sider className='sideNav'><SideNav></SideNav></Sider>
          <Layout>
          <NavBar></NavBar>
          <Content style={{padding: '20px'}}>
            <Switch>
              <PrivateRoute></PrivateRoute>
            </Switch>
          </Content>
          </Layout>
        </Layout>
      </Layout>
    </MainAppContentComponentContainer>
  )
} 

export default MainAppContentComponent

const MainAppContentComponentContainer = styled.div`
  .mainLayout{
    min-height: 100vh;
  }
  .btnPrimary{
  margin-top: 25px;
  background-color: #e95b29;
  color: #fefefe;
  border-radius: 30px!important;
  padding:  23px 40px;
  display: flex;
  align-items: center;
  font-size: 18px;
  letter-spacing: 1.1px;
  font-weight: 400;
  &:hover{
    background-color: #fefefe;
    border: 1px solid #e95b29;
    color: #e95b29;
  }
}
  @media(max-width: 768px){
    .sideNav{
      display: none;
      
      
    }
    
  }
 
`
