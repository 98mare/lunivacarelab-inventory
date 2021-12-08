import { notification } from 'antd';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Popover } from 'antd';
import NotificationContent from './NotificationContent';


// const openNotification = placement => {
//   data.map(e => (
//     notification.info({
//       message: `Notification`,
//       description:
//         `${e.itemName}`,
//       placement,
//     })
//   )) 
// };

const data = [
  {
    itemName : 'Some Item name 1',
  },
  {
    itemName : 'Some Item name 3',
  },
  {
    itemName : 'Some Item name 4',
  },
  {
    itemName : 'Some Item name 2',
  }, 
]



const Notification = () => {
  
  
  return (
    <NotificationContainer>
      {/* <span onClick={() => openNotification('topLeft')}>
      <i className='icon-line-bell'></i>
      </span> */}

      <Popover placement="bottom" content={<NotificationContent data={data}/>} trigger="click">
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

