import { Col, Row, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import Datepicker from './Datepicker'
import { useDispatch } from 'react-redux';
import { getItemTypeApi } from '../../services/itemItemTypeService'
import { getItemCategoryApi } from '../../services/itemCategoryService'
import { getLocationApi } from '../../services/itemLocationService'


const Filter = (props) => {
  const { itemType, categroryType, dateRange, dataRet, dateRet, locateRange } = props
  const dispatch = useDispatch();

  const { Option } = Select;

  const [iType, setiType] = useState(0)
  const [catType, setCatType] = useState(0)
  const [itemList, setItemList] = useState([])
  const [cateList, setcateList] = useState([])
  const [locationList, setlocationList] = useState([])
  const [locationId, setlocationId] = useState(0)
  const [fromDate, setfromDate] = useState([])
  
  const handleClicker = () => {
    if (dateRange !== undefined) {
      dateRet(fromDate)
    } else if(locateRange !== undefined){
      locateRange(locationId)
    } else {
      let data = {
        cType: catType,
        iType: iType
      }
      dataRet(data);
    }
  }

  useEffect(() => {
    if (dateRange === undefined) {
      dispatch(
        getItemTypeApi((val) => {
          setItemList(val)
        })
      )
      dispatch(
        getItemCategoryApi((val) => {
          setcateList(val)
        })
      )
    }

    if(locateRange !== undefined){
      dispatch(
        getLocationApi((val) => {
          setlocationList(val)
        })
      )
    }
  }, [])

  return (
    <FilterContainer>
      <Row justify='space-between'>
        <Row justify='space-between' className='gapping'>
          {itemType &&
            <Col>
              <Select defaultValue="0" onChange={(val) => { setiType(val) }} size='large' className='inputWidth'>
                <Option value="0">All</Option>
                {itemList?.map(iTy => {
                  if (iTy?.IsActive) {
                    return (
                      <Option value={iTy?.TId}>
                        {iTy?.ItemType}
                      </Option>
                    )
                  }
                })
                }
              </Select>
            </Col>
          }
          {categroryType &&
            <Col>
              <Select defaultValue="0" onChange={(val) => { setCatType(val) }} size='large' className='inputWidth'>
                <Option value="0">All</Option>
                {cateList?.map(iTy => {
                  if (iTy?.IsActive) {
                    return (
                      <Option value={iTy?.CId}>
                        {iTy?.CategoryType}
                      </Option>
                    )
                  }
                })
                }
              </Select>
            </Col>
          }
          {locateRange &&
            <Col>
              <Select onChange={(val) => { setlocationId(val) }} size='large' className='inputWidth'>
                {locationList?.map(iTy => {
                  if (iTy?.IsActive) {
                    return (
                      <Option value={iTy?.LId}>
                        {iTy?.Location}
                      </Option>
                    )
                  }
                })
                }
              </Select>
            </Col>
          }
          {
            dateRange &&
            <Col>
              <Datepicker onChanger={ (value) => {setfromDate(value)} }></Datepicker>
            </Col>
          }
        </Row>

        <Col >
          <AppButton className='primary-btn' buttonTitle="Search" buttonOnClick={() => { handleClicker() }}></AppButton>
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