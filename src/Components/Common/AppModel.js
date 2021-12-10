import React from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'antd';

const AppModel = () => {
  return (
    <AppModelContainer>
      <Modal title="Basic Modal" visible='vidible'>
        <p>portto</p>
        <p>pottao</p>
      </Modal>
    </AppModelContainer>
  )
}

export default AppModel

const AppModelContainer = styled.div``