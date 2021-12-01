import React from 'react';
import { Layout } from 'antd';
import NavBar from '../Components/Common/NavBar';
import SideNav from '../Components/Common/SideNav'
import styled from 'styled-components'

const { Sider, Content } = Layout;

const AppLayout = (props) => {
    return (
        <MainAppContentComponentContainer>
            <Layout className="mainLayout" id="app-layout">
                <Layout>
                    <Sider className='sideNav'><SideNav></SideNav></Sider>
                    <Layout className="main-app-layout">
                        <NavBar></NavBar>
                        {props?.secondaryNav &&
                            props?.secondaryNavigation
                        }
                        <Content style={{padding: '20px'}}>
                            {props?.children}
                        </Content>
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