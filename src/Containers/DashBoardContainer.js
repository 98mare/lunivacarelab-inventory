import { Button, Card } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { MenuRoute } from '../Data/MenuRoute'
import PageHeader from '../Components/Common/pageHeader'

const DashBoardContainer = () => {
  const data = MenuRoute;
  return (
    <DashbordContainer>
      <div className="buttonSection">

        {data.map(e => (
          <>
            {e.key !== "dashbord" ? <Button className='cButton'>
              <NavLink to={e.path}>
              
              <span>{e.name}</span>
              <span><i className={e.icon}></i> </span> 
              </NavLink>
            </Button> : ''}
          </>
        ))}


      </div>
    </DashbordContainer>
  )
}

export default DashBoardContainer

const DashbordContainer = styled.div`
  padding: 20px;
  .buttonSection{
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    
  }
  .cButton{
    height: 120px;
    width: calc(33% - 40px);
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    span{
      font-size: 20px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      margin-right: 20px;
      color: #a09999;
      i{
        font-size: 25px;
      
      }
    }
    @media(max-width: 768px){
      width: calc(50% - 20px);
    }
    @media(max-width: 500px){
      width: calc(100%);
    }
  }
`