import { Button, Col, Input, Row,Select } from 'antd'
import Search from 'antd/lib/input/Search'
import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import Datepicker from './Datepicker'
const { Option } = Select;

const Filter = (itemType, categroryType , dateRange) => {
  return (
    <FilterContainer>
      <Row justify='space-between'>
        <Row justify='space-between' className='gapping'>
          {itemType && 
            <Col>
              <Select defaultValue="Basic unit" size='large' className='inputWidth'>
                <Option value="time">Time</Option>
                <Option value="date">Date</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="quarter">Quarter</Option>
                <Option value="year">Year</Option>
              </Select>
            </Col>
          }
          {categroryType && 
            <Col>
            <Select defaultValue="Basic unit" size='large' className='inputWidth'>
              <Option value="time">Time</Option>
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="quarter">Quarter</Option>
              <Option value="year">Year</Option>
            </Select>
            </Col>
          }
          {
            dateRange && 
            <Col>
            <Datepicker></Datepicker>
            </Col>
          }
        </Row>
        
        
        
        
        
        <Col >
          {/* <Button size='large' type='primary'>Search</Button> */}
          <AppButton className='primary-btn'></AppButton>
        </Col>
      </Row>
    </FilterContainer>
  )
}

export default Filter

const FilterContainer = styled.div`
  background-color: #fefefe;
  padding: 10px;
  .gapping{
    gap: 20px;
    .inputWidth{
      width: 300px;
      text-align: left;
    }
  }

`