import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BottomNav = () => {
  return (
    <BottomNavContainer>
      <li>
        <Link to=''><i className='icon-line2-home'></i></Link>
      </li>
      <li>
        <Link to=''><i className='icon-line-box'></i></Link>
      </li>
      <li>
        <Link to=''><i className='icon-user1'></i></Link>
      </li>
      <li>
        <Link to=''><i className='icon-line2-settings'></i></Link>
      </li>
    </BottomNavContainer>
  )
}

export default BottomNav

const BottomNavContainer = styled.div`
  display: none;
  
  li{
    list-style: none;
    i{
      color: #fefefe;
      font-size: 18px;
    }
  }
  @media(max-width: 500px){
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  display: flex;
  
  justify-content: space-between;
  align-items: center;
  background-color:#e95c29e1;
  padding: 15px 40px;
  }
`