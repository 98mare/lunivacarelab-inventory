import { notification } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Popover } from 'antd';
import NotificationContent from './NotificationContent';
import {useDispatch} from 'react-redux'
import { getItemNearApi } from '../../services/itemNewItemService';

const Notification = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  const getData =() => {
    const pushedArr = []
    dispatch(getItemNearApi(value =>{ 
      value.forEach(ele => {
        pushedArr.push(ele);
      })
    setTableData(pushedArr)

  }))
  }
  useEffect(() => {
    getData();
  }, [])
  

  return (
    <NotificationContainer>
     
      
      <Popover placement="bottom" 
        content={<NotificationContent 
        data={tableData}/>} 
        trigger="click">
      <i className='icon-line-bell'></i>
      </Popover>
      
    </NotificationContainer>
  )
}

export default Notification

const NotificationContainer = styled.div`

  i{
    color: var(--primary);
    width: 40px;
    height: 40px;
    border: 2px solid var(--primary);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

