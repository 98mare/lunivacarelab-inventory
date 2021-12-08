import { notification } from 'antd';
import React from 'react'
import styled from 'styled-components'

const openNotification = placement => {
  notification.info({
    message: `Notification ${placement}`,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

const Notification = () => {
  return (
    <NotificationContainer>
      <span onClick={() => openNotification('topLeft')}>
      <i className='icon-line-bell'></i>
      </span>
      
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
