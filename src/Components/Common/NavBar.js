import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import SerchBar from './SerchBar'
import UserBar from './UserBar'

const NavBar = () => {
  return (
    <NavBarContainer>
      
        <Row justify="space-between">
          <Col span={8}>
            <SerchBar></SerchBar>
          </Col>
          <Col span={4} offset={12}>
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
`