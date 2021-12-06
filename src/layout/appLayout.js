import React, { useState } from 'react';
import NavBar from '../Components/Common/NavBar';
import SideNav from '../Components/Common/SideNav'
import styled from 'styled-components'
import BottomNav from '../Components/Common/BottomNav';
import MobileNav from '../Components/Common/MobileNav';


import { Layout } from 'antd';

const { Content,Footer } = Layout;

const AppLayout = (props) => {
  const [Value, setValue] = useState();

  const statePass = (val) => {
    setValue(val);
  }

  return (


    <MainAppContentComponentContainer>
      <Layout className="mainLayout" id="app-layout">
        <Layout>
          <SideNav statePass={statePass}></SideNav>
          <Layout className="main-app-layout">
            <NavBar></NavBar>
            <MobileNav />
            {props?.secondaryNav &&
              props?.secondaryNavigation
            }
            <Content className={Value === true ? 'costomeContent2' : 'costomeContent1'}>
              {props?.children}
              
            </Content>
            
            <Footer className="footer">
             <h3>All rights reserved &copy; Lunivatech Pvt.Ltd 2021</h3>
            </Footer>
            
            <BottomNav></BottomNav>
          </Layout>
        </Layout>
      </Layout>
    </MainAppContentComponentContainer>
  )
}

export default AppLayout;

const MainAppContentComponentContainer = styled.div`
  .mainLayout{
    min-height: 100vh;
  }
  .costomeContent1{
    padding: 20px 20px 20px 220px;
    @media(max-width: 576px){
      padding: 20px;
    }
  }
  .costomeContent2{
    padding: 20px 20px 20px 100px;
    @media(max-width: 576px){
      padding: 20px;
    }
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
  @media(max-width: 576px){
    .sideNav{
      display: none; 
    } 
  }
  .footer{
    display: flex;
    justify-content: center;
    @media(max-width: 576px){
      display: none;
    }
  }
`