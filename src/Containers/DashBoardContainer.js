// import { Button, Card } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { MenuRoute } from '../Data/MenuRoute'
// import DashbordCard from '../Components/Common/DashbordCard'
// import PageHeader from '../Components/Common/pageHeader'


const DashBoardContainer = () => {
  const data = MenuRoute;
 
  return (
    <DashbordContainer>
        {data.map(e => (
          <>
            {e.key !== "dashbord" ? 
            <NavLink to={e.path}>
              <div className='cButton'>
                
                  <span>{e.name}</span>
                  <span><i className={e.icon}></i> </span>
               
              </div> 
              </NavLink>
           
             
             : ''}
          </>
        ))}


              {/* <DashbordCard path={e.path} name={e.name} icon={e.icon}></DashbordCard> */}
 
    
    </DashbordContainer>
  )
}

export default DashBoardContainer

const DashbordContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  width: 100%;
  
  
  @media(max-width: 500px){
    padding: 0px;
    justify-content: center;
    gap: 15px;
    margin-bottom: 50px;
  }
  
  .cButton{
    height: 120px;
    width: 230px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: #fefefe;
    /* background-image: linear-gradient(to right top, #e0e0e0, #e8e8e8, #efefef, #f7f7f7, #ffffff);     */
    
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    /* border: 1px solid rgba( 255, 255, 255, 0.18 ); */
    span{
      font-size: 20px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: #a09999;
      i{
        font-size: 25px;
      
      }
    }
    
    @media(max-width: 768px){
      width: 200px;
      gap: 10px;  
      span{
      font-size: 16px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      margin-right: 10px;
      color: #a09999;
      i{
        font-size: 25px;
      
      }
    }
    }
    @media(max-width: 500px){
      width: 310px;
      height: 80px;
    }
   
  }
`