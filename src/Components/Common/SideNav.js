// import { Menu} from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { MenuRoute,settingsMenu } from '../../Data/MenuRoute'
import {NavLink} from 'react-router-dom'
import comlogo from '../../assets/images/logo.png';
import comlogo1 from '../../assets/images/logo1.png';

import { Layout, Menu } from 'antd';
const {  Sider } = Layout;

const { SubMenu } = Menu;



const SideNav = (props) => {
  const {statePass} = props
  const data =  MenuRoute;
  const menuData = settingsMenu;
  const [collpsed, setcollpsed] = useState(false);

    function oncollpse(){
      setcollpsed(!collpsed);
    }

    statePass(collpsed)

  return (
    <SideNavContainer>
           
      <Sider collapsible collapsed={collpsed} onCollapse={oncollpse} className='sideNav'>
        <div className="logo">
        {
          collpsed === true? 
          <img src={comlogo1} alt="luniva" /> :
          <img src={comlogo} alt="luniva"/>
        }
        
        </div>
          <Menu  mode="inline" defaultSelectedKeys={['1']} style={{background: '#fefefe'}}>
            {data.map(e => (
              <Menu.Item key={e.key} icon={<i className={e.icon}></i>}>
                <NavLink to={e?.path} className='navLInk' >
                  {e.name}
                </NavLink>
              </Menu.Item>
            ))}


            <SubMenu key="set1" title='Settings' icon={<i className='icon-line2-settings'></i>}>
            {
              menuData.map(e => (
                <Menu.Item key={e.key} icon={<i className={e.icon}></i>}>
                  <NavLink to={e?.path} className='navLInk' >
                    {e.name}
                  </NavLink>
                </Menu.Item>
                ) )
            }
          </SubMenu>
        </Menu>
        </Sider>
        
        
    </SideNavContainer>
  )
}

export default SideNav

const SideNavContainer = styled.div`
  height: 100%;
  padding: 20px 0;
  background-color: #Fefefe;
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  position: fixed;
  z-index: 100;
  /* overflow-y: auto; */
    
  .logo{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 30px;
    margin-bottom: 10px;
    img{
      height: 100%;
    }
  }
  .navLInk{
    display: flex;
    gap: 20px;
    font-size: 16px;
    align-items: center;
    text-transform: capitalize;
   
    i{
      font-size: 20px;
      color: #464343;
    }
  }
  .ant-layout-sider{
    background-color: #fefefe;
  }
  .ant-layout-sider-trigger{
    background-color: var(--primary);
  }
  /* .ant-menu-item a {
    color: 
  } */
  
`
