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
      
      <Menu theme='dark' 
        mode="inline"
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
      >
      
      <div className="logo">
      <img src="./Assets/images/logo1.png" alt="" />
      <h3>CareLab</h3>
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
  min-height: 100vh;
  padding: 20px 0;
  .logo{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img{
      width: 60px;
    }
    h3{
      font-size: 20px;
      color: #fefefe;
      text-transform: uppercase;
    }
  }
  .navLInk{
    display: flex;
    gap: 20px;
    font-size: 16px;
    align-items: center;
    text-transform: capitalize;
    p{
      margin-top: 30px;
    }
  }
`
