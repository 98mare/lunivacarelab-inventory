import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import UserBar from './UserBar'

const NavBar = () => {
  return (
    <NavBarContainer>
      
        <Row justify="space-between">
          <Col>
            <h1 style={{color: '#232324'}}>Inventory Management system</h1>
          </Col>
          <Col>
            <UserBar></UserBar>
          </Col>
        </Row>
      
    </NavBarContainer>
  )
}

export default NavBar

const NavBarContainer = styled.div`
  padding: 20px;
  cursor: pointer;
  background-color: #fefefe;

  @media(max-width: 500px){
    display: none;
  }
`