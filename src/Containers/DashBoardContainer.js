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
      {/* <PageHeader></PageHeader> */}
      <div className="buttonSection">
        {/* {data.map(e => (
          <Card className='card'>
            <NavLink to={e.path}>
              {e.name}
            </NavLink>
          </Card>
        ))} */}
        {data.map(e => (
          <>
            {e.key !== "dashbord" ? <Button className='cButton'>
              <NavLink to={e.path}>
              {/* <span><img src={e.icon} alt="" /></span>  */}
              {e.name}
              </NavLink>
            </Button> : ''}
          </>
        ))}



        {/* <Card className='card'>
          <p>Add Item</p>
        </Card>
        <Card className='card'>
          <p>Add Item</p>
        </Card>
        <Card className='card'>
          <p>Add Item</p>
        </Card> */}
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
    gap: 20px;
    
  }
  .cButton{
    height: 120px;
    width: calc(25% - 20px);
    /* border-radius: 5px; */
    font-size: 20px;
    letter-spacing: 1.4px;
    text-transform: uppercase;
  }
`