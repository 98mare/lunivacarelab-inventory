import React from 'react'
import styled from 'styled-components'
import { CSVLink } from 'react-csv';
const GoodsInCSV = () => {


  return (
    <GoodsInCSVContainer>
      <CSVLink filename={"sample-quote.csv"} className="btn ant-btn btn-primary btn-primary--outline" data='a'>{}</CSVLink>
    </GoodsInCSVContainer>
  )
}

export default GoodsInCSV

const GoodsInCSVContainer = styled.div``