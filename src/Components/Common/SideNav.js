import {Button, Menu} from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React from 'react'
import styled from 'styled-components'
import { MenuRoute } from '../../Data/MenuRoute'
import {NavLink} from 'react-router-dom'

const SideNav = () => {
  const data =  MenuRoute;
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
            <span><img src={e.icon} alt="" /></span>
            <p>{e.name}</p>
          </NavLink>
        </Menu.Item>
      ))}
      {/* {data.map(e => (
        <SubMenu key={e.key} title={e.name}>
          {e.subMenu && e.subMenu.map(a => (
            <Menu.Item key={a.key}>
              <NavLink to={a?.path}>{a.name}</NavLink>
            </Menu.Item>
          ))} 
      </SubMenu>
      ))} */}
      </Menu>
    </SideNavContainer>
  )
}

export default SideNav

const SideNavContainer = styled.div`
  height: 100%;
  padding: 20px 0;
  background-color: #Fefefe;
  box-shadow: 0px 0px 10px #9696c02b;
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
    }
    img{
      width: 30px;
    }
  }
`
