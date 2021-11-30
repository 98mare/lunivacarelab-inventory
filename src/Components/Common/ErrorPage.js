import React from 'react'
import styled from 'styled-components'

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <img src="./assets/icons/contruction.svg" alt="" />
      <h3>Under Construction ...</h3>
    </ErrorPageContainer>
  )
}

export default ErrorPage

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60vh;
  img{
    width: 300px;
  }
`
