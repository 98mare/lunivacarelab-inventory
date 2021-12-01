import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CaretDownFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Button, Space } from 'antd'
import { Link, useHistory } from 'react-router-dom'

const UserBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userHere, setUserHere] = useState('');

  useEffect(() => {
    // handleUser()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
  }

  // const handleUser = () => {
  //   const tokenString = JSON.parse(localStorage.getItem('token'));
  //   setUserHere(tokenString.username);
  // }

  const menu = (
    <Menu>
      <Menu.Item>
        <a target='_blank' rel='noopener noreferrer' href='#'>settings</a>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={() => handleLogout()}>{'logout'}</Link>
      </Menu.Item>

    </Menu>
  )

  return (
    <UserBarContainer>
      <div className="userIcon">
        <img src="./Assets/icons/user.svg" alt="" />
      </div>
      <span className='userName'>{userHere}</span>
      <Dropdown overlay={menu} placement="bottomLeft">
        <CaretDownFilled />
      </Dropdown>

    </UserBarContainer>
  )
}

export default UserBar


const UserBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #fefefe;
  padding: 5px 10px 5px 20px;
  border-radius: 20px;
  background-color: #e95b29;
  color: #fefefe;
  gap: 15px;
  .userIcon{
    width: 30px;
    height: 30px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .userName{
    font-size: 16px;

  }
`
