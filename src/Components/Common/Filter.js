import { Col, Row, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import Datepicker from './Datepicker'
import { useDispatch } from 'react-redux';
import { getItemTypeApi } from '../../services/itemItemTypeService'
import { getItemCategoryApi } from '../../services/itemCategoryService'
import { getLocationApi } from '../../services/itemLocationService'
import moment from 'moment';
import { getLabItemsApi } from '../../services/itemNewItemService'
import FilterTable from './FilterTable'

const Filter = (props) => {
  const { itemType, categroryType, dateRange, dataRet, dateRet, locateRange, itemName, notAll, notAllLocate } = props
  const dispatch = useDispatch();

  const { Option } = Select;

  const [iType, setiType] = useState(0)
  const [catType, setCatType] = useState(0)
  const [itemList, setItemList] = useState([])
  const [cateList, setcateList] = useState([])
  const [locationList, setlocationList] = useState([])
  const [locationId, setlocationId] = useState(0)
  const [fromDate, setfromDate] = useState([moment(), moment()])
  const [itemNameList, setitemNameList] = useState(notAll === undefined ? 0 : 1)
  const [itemNameLister, setitemNameLister] = useState([])

  const handleClicker = () => {
    if (dateRange !== undefined) {
      if (itemName !== undefined) {
        dateRet({ ...fromDate, itemid: itemNameList })
      } else if (fromDate !== null) {
        dateRet(fromDate)
      }
    } else if (locateRange !== undefined) {
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
    if (dateRange === undefined && itemType !== undefined && categroryType !== undefined) {
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

    if (locateRange !== undefined) {
      dispatch(
        getLocationApi((val) => {
          setlocationList(val)
        })
      )
    }

    if (itemName !== undefined) {
      let data = {
        typeId: 0,
        categoryId: 0
      }
      dispatch(
        getLabItemsApi(data, (val) => {
          setitemNameLister(val)
        })
      )
    }
  }, [])

  return (
    <FilterContainer>

      <Row className="filterRow" align='bottom'>
        {itemType &&
          <Col md={6} sm={11} xs={24}>
            <span className='labelTop'>Item Type</span>
            <Select style={{ width: '100%' }} defaultValue="0" onChange={(val) => { setiType(val) }} size='large' className='inputWidth'>
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
          <Col md={6} sm={11} xs={24}>
            <span className='labelTop'>Category Type</span>
            <Select style={{ width: '100%' }} defaultValue="0" onChange={(val) => { setCatType(val) }} size='large' className='inputWidth'>
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
          <Col md={6} sm={12} xs={24}>
            <span className='labelTop'>Location</span>
            <Select style={{ width: '100%' }} onChange={(val) => { setlocationId(val) }} size='large' className='inputWidth'>
              {notAllLocate !== undefined ? (
                <Option value='0'>
                  All
                </Option>
              ) : ''}
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
          <Col md={6} sm={12} xs={24}>
            <span className='labelTop'>From - To</span>
            <Datepicker defaultValuer={fromDate} onChanger={(value) => { setfromDate(value) }}></Datepicker>
          </Col>
        }
        {itemName &&
          <Col md={6} sm={12} xs={24}>
            <span className='labelTop'>Item Name</span>
            <Select style={{ width: '100%' }} onChange={(val) => { setitemNameList(val) }} size='large' className='inputWidth'>
              {notAll === undefined ? (
                <Option value='0'>
                  All
                </Option>
              ) : ''}
              {itemNameLister?.map(iTy => {
                if (iTy?.IsActive) {
                  return (
                    <Option value={iTy?.TId}>
                      {iTy?.ItemName}
                    </Option>
                  )
                }
              })
              }
            </Select>
          </Col>
        }
        <AppButton className='primary-btn' buttonTitle="Search" buttonOnClick={() => { handleClicker() }} priamryOutlineBtn></AppButton>

        <FilterTable></FilterTable>

      </Row>
    </FilterContainer>
  )
}

export default Filter

const FilterContainer = styled.div`
  background-color: #fefefe;
  .filterRow > div {
    padding: 10px;
  }
  .labelTop{
  }
`