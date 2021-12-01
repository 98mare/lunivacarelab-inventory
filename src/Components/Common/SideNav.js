import {Button, Menu} from 'antd'
import React from 'react'
import styled from 'styled-components'
import { MenuRoute,settingsMenu } from '../../Data/MenuRoute'
import {NavLink} from 'react-router-dom'
const { SubMenu } = Menu;


const SideNav = () => {
  const data =  MenuRoute;
  const menuData = settingsMenu;
  return (
    <SideNavContainer>

      <Menu 
        mode="inline"
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
      >
      
      <div className="logo">
      <img src="./Assets/images/logo.png" alt="" />
      </div>
      
      
      {data.map(e => (
        <Menu.Item key={e.key}>
          
          <NavLink to={e?.path} className='navLInk'>
            <i className={e.icon}></i>
            <p>{e.name}</p>
          </NavLink>
        </Menu.Item>
      ))}

      
          <SubMenu title={<span className='navLInk'><i className='icon-line2-settings'></i><p>Settings</p></span>} style={{fontSize: '16px'}}>
            {
              menuData.map(e => (
                <Menu.Item key={e.key}>
                  <NavLink to={e?.path} className='navLInk'>
                  <i className={e.icon}></i>
                  <p>{e.name}</p>
                  </NavLink>
                </Menu.Item >
                ) )
            }
          </SubMenu>
       
      </Menu>
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
    
  .logo{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img{
      width: 80%;
    }
  }
  .navLInk{
    display: flex;
    gap: 20px;
    font-size: 16px;
    align-items: center;
    text-transform: capitalize;
    p{
      margin-top: 21px;
      color: #464343;
    }
    i{
      font-size: 20px;
      color: #464343;
    }
  }
  
`
