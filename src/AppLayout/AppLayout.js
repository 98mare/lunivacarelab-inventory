import { Layout } from 'antd'

// import Sider from 'antd/lib/layout/Sider'

import React from 'react'
import styled from 'styled-components'


import SideNav from '../Components/Common/SideNav'
import AppContentContainer from '../Containers/AppContentContainer'


const { Header, Sider, Content } = Layout;

const AppLayout = (props) => {
  // const {Component} = props.component;
  // console.log(props.myComponent);
  return (
    <AppLayoutContainer>
      <Layout>
      {/* <Header><NavigationBar></NavigationBar></Header> */}
        <Layout>
          <Sider><SideNav></SideNav></Sider>
          <Layout>
          <Content>
            <AppContentContainer {...props}/>
          </Content>
          </Layout>
          
        </Layout>
        
      </Layout>
    </AppLayoutContainer>
  )
}

export default AppLayout

const AppLayoutContainer = styled.div``