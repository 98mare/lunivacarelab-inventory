import { Form, Input, Button, Checkbox, Select, InputNumber, message, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getItemCategoryApi } from '../../services/itemCategoryService';
import { getItemTypeApi } from '../../services/itemItemTypeService';
import { getLocationApi } from '../../services/itemLocationService';
import { getManuDetApi } from '../../services/itemManufactureService';
import { getLabItemsApi, insertNewItemDetailsApi } from '../../services/itemNewItemService';
import { getRackDetApi } from '../../services/itemRackService';
import { getItemUnitApi } from '../../services/itemUnitService';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const AddItem = (props) => {
  const { forEdit } = props;
  const { Option } = Select;
  const [form] = Form.useForm()
  const history = useHistory();
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setItemList] = useState([])
  const [cateList, setcateList] = useState([])
  const [unitList, setunitList] = useState([])
  const [manuList, setmanuList] = useState([])
  const [locationList, setlocationList] = useState([])
  const [rackList, setrackList] = useState([]);
  const Param = props?.match?.params;
  const TId = Param?.id;
  const TyId = Param?.typeId;
  const CaId = Param?.cateId;
  const newItemReducer = useSelector(state => state.newItem);
  const [previousValues, setPreviousValues] = useState(forEdit ? newItemReducer?.newItems[TId] : {});

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getLabItemsApi({ typeId: TyId, categoryId: CaId }, (val) => { }, TId))
    }
    getAllItemList()
  }, [])

  useEffect(() => {
    setPreviousValues(newItemReducer?.newItems[TId]);
  }, [newItemReducer?.newItems[TId]])

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields()
    }
  }, [previousValues])

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
      getRackDetApi(value, (val) => {
        setrackList(val)
      })
    )
  }

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "TId": forEdit ? TId : 0,
      "ItemCode": values?.ItemCode,
      "ItemName": values?.ItemName,
      "ItemTypeId": values?.ItemTypeId,
      "ItemCategoryId": values?.ItemCategoryId,
      "UnitId": values?.UnitId,
      "ManufactureId": values?.ManufactureId,
      "LocationId": values?.LocationId,
      "RackId": values?.RackId,
      "MinQty": values?.MinQty,
      "CreatedBy": 1, //needs login userid
      "CreatedDate": moment().format('YYYY-MM-DD'), //default date for now update
      "IsActive": values?.IsActive
    }
    dispatch(insertNewItemDetailsApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          history.push('/item')
        }, 1000);
      } else {
        setButDis(false)
        message.error('Something went wrong Try again')
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    // const value = form.getFieldValue(field.key)
    // form.setFieldsValue({[field.key]: {...value, ['type']: your_new_value}})
    setButDis(false)
  };

  return (
    <AddItemContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18
            }}
            initialValues={previousValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Item Code"
              name="ItemCode"
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
              name="ItemName"
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
              name="ItemTypeId"
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
              name="ItemCategoryId"
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
              name="UnitId"
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
              name="ManufactureId"
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
              name="LocationId"
              rules={[
                {
                  required: true,
                  message: 'Please select Location!',
                },
              ]}
            >
              <Select onChange={(val) => handleRackLocation(val)} allowClear>
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
              name="RackId"
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
              name="MinQty"
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
              name="IsActive"
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
                {forEdit ? 'Edit' : 'Submit'}
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
  margin-bottom: 50px;
`