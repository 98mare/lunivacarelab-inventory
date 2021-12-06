import React from 'react'
import styled from 'styled-components'
import loadlogo from '../../assets/images/logo1.png';

const MobileNav = () => {
  return (
    <MobileNavContainer>
      <div className="logo">
        <img src={loadlogo} alt="" />
      </div>
      <div className="userIcon">
        
      </div>
    </MobileNavContainer>
  )
}

export default MobileNav

const MobileNavContainer = styled.div`
  display: none;
  padding: 8px 15px;
  background-color: #fefefe;
  position: relative;
  
  @media(max-width: 500px){
    display: block;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
    width: 40px;
    img{
      width: 100%;
    }
    
  }
  }
  
`