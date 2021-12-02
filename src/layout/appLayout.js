import React, { useEffect } from 'react';
import { Layout, Modal } from 'antd';
import NavBar from '../Components/Common/NavBar';
import SideNav from '../Components/Common/SideNav'
import styled from 'styled-components'
import BottomNav from '../Components/Common/BottomNav';
import MobileNav from '../Components/Common/MobileNav';
import pMinDelay from 'p-min-delay';

const { Sider, Content } = Layout;

// function success() {
//   Modal.success({
//     content: 'Welcome User',
//   });
// }
// pMinDelay(success(), 200);



const AppLayout = (props) => {
  // useEffect(() => {
  //   pMinDelay(success(), 200);
  // }, [])
  
    return (
        <MainAppContentComponentContainer>
            <Layout className="mainLayout" id="app-layout">
                <Layout>
                    <Sider className='sideNav'><SideNav></SideNav></Sider>
                    <Layout className="main-app-layout">
                        <NavBar></NavBar>
                        <MobileNav />
                        {props?.secondaryNav &&
                            props?.secondaryNavigation
                        }
                        <Content style={{padding: '20px'}}>
                            {props?.children}
                        </Content>
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