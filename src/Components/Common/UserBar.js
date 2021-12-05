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
  }

  const handleUser = () => {
    const tokenStrings = JSON.parse(localStorage.getItem('token'));
    if(tokenStrings === null){
      history.push('/login');
      return
    }
    setUserHere(tokenStrings.username);
  }

  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      color: 'red'
      }}>
      {/* <Link to=''>change passowrd</Link> */}
      <Link to='/login' onClick={handleLogout}>Logout</Link>
    </div>
  );

  

  return (
    <UserBarContainer>
      <Popover placement="bottom" content={content} trigger="click">
          <i className='icon-user1'></i>
          <span className='userName'>{userHere}</span>
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
  padding: 10px 20px;
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
    margin-left: 20px;

  }
`
