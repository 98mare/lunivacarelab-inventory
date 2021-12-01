import { Form, Input, Button, Checkbox, Select, InputNumber, message, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getItemCategoryApi } from '../../services/itemCategoryService';
import { getItemTypeApi } from '../../services/itemItemTypeService';
import { getLocationApi } from '../../services/itemLocationService';
import { getManuDetApi } from '../../services/itemManufactureService';
import { insertNewItemDetailsApi } from '../../services/itemNewItemService';
import { getRackDetApi } from '../../services/itemRackService';
import { getItemUnitApi } from '../../services/itemUnitService';
import moment from 'moment';

const AddItem = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setItemList] = useState([])
  const [cateList, setcateList] = useState([])
  const [unitList, setunitList] = useState([])
  const [manuList, setmanuList] = useState([])
  const [locationList, setlocationList] = useState([])
  const [rackList, setrackList] = useState([])

  useEffect(() => {
    getAllItemList()
  }, [])

  const getAllItemList = () => {

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
    dispatch(
      getItemUnitApi((val) => {
        setunitList(val)
      })
    )
    dispatch(
      getManuDetApi((val) => {
        setmanuList(val)
      })
    )
    dispatch(
      getLocationApi((val) => {
        setlocationList(val)
      })
    )
  }

  const handleRackLocation = (value) => {
    dispatch(
      getRackDetApi( value, (val) => {
        setrackList(val)
      })
    )
  }

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "TId": 0,
      "ItemCode": values?.item_code,
      "ItemName": values?.item_name,
      "ItemTypeId": values?.item_type,
      "ItemCategoryId": values?.item_category,
      "UnitId": values?.item_unit,
      "ManufactureId": values?.item_manufacturer,
      "LocationId": values?.location,
      "RackId": values?.item_rack,
      "MinQty": values?.min_qty,
      "CreatedBy": 1, //needs login userid
      "CreatedDate": moment().format('YYYY-MM-DD'), //default date for now update
      "IsActive": values?.isactive
    }
    dispatch(insertNewItemDetailsApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        setButDis(true)
        message.error(res?.Message)
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false)
  };

  return (
    <AddItemContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
            name="add_items"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Item Code"
              name="item_code"
              rules={[
                {
                  required: true,
                  message: 'Please input item code!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Item name"
              name="item_name"
              rules={[
                {
                  required: true,
                  message: 'Please input item name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Item Type"
              name="item_type"
              rules={[
                {
                  required: true,
                  message: 'Please select item type!',
                },
              ]}
            >
              <Select allowClear>
                {itemList?.map(iTy => {
                  return (
                    <Option value={iTy?.TId}>
                      {iTy?.ItemType}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Item Category"
              name="item_category"
              rules={[
                {
                  required: true,
                  message: 'Please select item category!',
                },
              ]}
            >
              <Select allowClear>
                {cateList?.map(iTy => {
                  return (
                    <Option value={iTy?.CId}>
                      {iTy?.CategoryType}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Item unit"
              name="item_unit"
              rules={[
                {
                  required: true,
                  message: 'Please select item unit!',
                },
              ]}
            >
              <Select allowClear>
                {unitList?.map(iTy => {
                  return (
                    <Option value={iTy?.UnId}>
                      {iTy?.Units}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Item manufacturer"
              name="item_manufacturer"
              rules={[
                {
                  required: true,
                  message: 'Please select item manufacturer!',
                },
              ]}
            >
              <Select allowClear>
                {manuList?.map(iTy => {
                  return (
                    <Option value={iTy?.MId}>
                      {iTy?.ManufactureBY}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Please select Location!',
                },
              ]}
            >
              <Select onChange={ (val) => handleRackLocation(val) } allowClear>
                {locationList?.map(iTy => {
                  return (
                    <Option value={iTy?.LId}>
                      {iTy?.Location}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Rack"
              name="item_rack"
              rules={[
                {
                  required: true,
                  message: 'Please select rack!',
                },
              ]}
            >
              <Select allowClear>
                {rackList?.map(iTy => {
                  return (
                    <Option value={iTy?.RId}>
                      {iTy?.RackName}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Min Qty"
              name="min_qty"
              rules={[
                {
                  required: true,
                  message: 'Please input minimum quantity!',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="isactive"
              valuePropName="checked"
            >
              <Checkbox>Is Active</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit" disabled={butDis} className='btnPrimary'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </AddItemContainer>
  );
};

export default AddItem;

const AddItemContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`