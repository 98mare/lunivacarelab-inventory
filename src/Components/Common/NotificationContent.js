import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const NotificationContent = ({ data }) => {
 
  const history = useHistory();
  return (
    <NotificationContentContainer>

      {
    
        data.slice(0,5).map(e => (
          <div className="card" onClick={()=>history.push('/reports/minquantityreport')}>
            <div className="icon">
              <i className='icon-exclamation-sign'></i>
            </div>
            <div className="content">
              <div className="h3">{e.ItemName}</div>
              <p>Min qty:{e.MinQty} Remanaing Count: {e.RemainingCount} </p>
            </div>
          </div>
        ))
      }

      <a onClick={()=>history.push('/reports/minquantityreport')}>see more</a>
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