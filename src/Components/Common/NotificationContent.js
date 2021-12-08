import React from 'react'
import styled from 'styled-components'

const NotificationContent = ({data}) => {
  return (
    <NotificationContentContainer>

    {
      data.map(e => (
        <div className="card">
        <div className="icon">
          <i className='icon-exclamation-sign'></i>
        </div>
        <div className="content">
          <div className="h3">{e.itemName}</div>
          <p>The item is going to be out of stock</p>
        </div>
      </div>
      ))
    }
      
      
    </NotificationContentContainer>
  )
}

export default NotificationContent

const NotificationContentContainer = styled.div`
  width: 300px;
  .card{
    /* border-left: 4px solid var(--primary); */
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    border-right: 1px solid var(--primary);
    .icon{
      font-size: 30px;
      color: var(--primary);
    }
    &:hover{
      border-right: 2px solid var(--primary);
    }
  }
`