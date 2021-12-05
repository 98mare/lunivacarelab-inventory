import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CaretDownFilled } from '@ant-design/icons'
// import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Popover, Button } from 'antd'
import { Link, useHistory, Redirect} from 'react-router-dom'
import { tokenString } from './HandleUser'

const UserBar = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  const [userHere, setUserHere] = useState('');

  useEffect(() => {
    handleUser()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    // <Link to='/login'></Link>
    console.log('potaot potato')
  }

  const handleUser = () => {
    // const tokenString = JSON.parse(localStorage.getItem('token'));
    // <tokenString />
    setUserHere(tokenString.username);
  }

  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      color: 'red'
      }}>
      {/* <Link to=''>change passowrd</Link> */}
      <Link to='/login' onClick={handleLogout}>log-out</Link>
    </div>
  );

  const menu = (
    <Menu>
      {/* <Menu.Item>
        <a target='_blank' rel='noopener noreferrer' href='#'>settings</a>
      </Menu.Item> */}
      <Menu.Item>
        {/* <Link to='/login' onClick={handleLogout()}>{'logout'}</Link> */}
      </Menu.Item>

    </Menu>
  )

  return (
    <UserBarContainer>
      {/* <div className="userIcon">
        <img src="./Assets/icons/user.svg" alt="" />
      </div>
      <span className='userName'>{userHere}</span> */}
      {/* <Dropdown overlay={menu} placement="bottomLeft">
        <CaretDownFilled />
      </Dropdown> */}
      <Popover placement="bottom" content={content} trigger="click">
          <i className='icon-user1'></i>
          <span>{userHere}</span>
        </Popover>

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
