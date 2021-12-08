import { Form, Input, Button, DatePicker, Select, InputNumber, message, Row, Col, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getManuDetApi } from '../../services/itemManufactureService';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { getGoodsReceivedApi, insertGoodsReceivedApi } from '../../services/labGoodsReceivedService';
import moment from 'moment';
import { tokenString } from '../Common/HandleUser';
import { formItemLayout } from '../Common/FormItemLayout';
import { useHistory } from 'react-router-dom';
import { SearchSelect } from '../Common/SearchSelect';

const AddGoods = (props) => {
  const { forEdit } = props
  const { Option } = Select;
  const [form] = Form.useForm()
  const dispatch = useDispatch();
  const history = useHistory();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([])
  const [manuList, setmanuList] = useState([])
  const [enQty, setenQty] = useState(0);
  const [enRate, setenRate] = useState(0);
  const [totalCal, settotalCal] = useState(0);
  const GId = props?.match?.params?.id;
  const fromDat = props?.match?.params?.from;
  const goodsInReducer = useSelector(state => state.goodsin);
  const [previousValues, setPreviousValues] = useState(forEdit ? goodsInReducer?.goodsin[GId] : {});

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getGoodsReceivedApi({ fromdate: fromDat, todate: fromDat }, (val) => { }))
    }
    dispatch(
      getManuDetApi((val) => {
        setmanuList(val)
      })
    )
    getAllLabItem()
  }, [])

  useEffect(() => {
    setPreviousValues(goodsInReducer?.goodsin[GId]);
  }, [goodsInReducer?.goodsin[GId]])

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields()

      setenQty(previousValues?.Quantity);
      setenRate(previousValues?.Rate);
      settotalCal(previousValues?.Total);
    }
  }, [previousValues])

  const getAllLabItem = (ty = 0, cI = 0) => {
    let data = {
      typeId: ty,
      categoryId: cI
    }
    dispatch(getLabItemsApi(data, (val) => {
      setitemList(val)
    }))
  }

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "GId": forEdit ? GId : 0,
      "ItemId": values?.ItemId,
      "Quantity": values?.Quantity,
      "Rate": values?.Rate,
      "Total": totalCal,
      "ExpiryDate": values?.expiry_date.format("YYYY-MM-DD"),
      "ManufactureId": values?.ManufactureId,
      "LotNo": values?.LotNO,
      "ItmTrackId": values?.ItmTrackId,
      "CreatedDate": values?.create_date.format("YYYY-MM-DD"),
      "CreatedBy": tokenString.UId,
      "ItemStatus": values?.ItemStatus,
    }
    dispatch(insertGoodsReceivedApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          history.push('/goodsin')
        }, 1000);
      } else {
        setButDis(false)
        message.error('Something went wrong Try again')
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false)
  };

  useEffect(() => {
    calculateTotal()
  }, [enQty, enRate])

  const calculateTotal = () => {
    let newTotal = enQty * enRate;
    settotalCal(newTotal)
  }

  let prevVal = {}
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
      create_date: moment(previousValues?.CreatedDate),
      expiry_date: moment(previousValues?.ExpiryDate)
    }
  }

  return (
    <AddGoodsContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            {...formItemLayout}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              label="Item name"
              name="ItemId"
              rules={[
                {
                  required: true,
                  message: 'Please input item name!',
                },
              ]}
            >
              <SearchSelect itemList={itemList?.map(iTy => {
                return (
                  <Option
                    title={iTy?.ItemName}
                    key={iTy?.TId}
                    value={iTy?.TId}>
                    {iTy?.ItemName}
                  </Option>
                )
              })
              }
                placer='Select an item'
              />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="Quantity"
              rules={[
                {
                  required: true,
                  message: 'Please input quantity!',
                },
              ]}
            >
              <InputNumber
                onInput={(val) => { setenQty(val) }}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Rate"
              name="Rate"
              rules={[
                {
                  required: true,
                  message: 'Please input rate!',
                },
              ]}
            >
              <InputNumber
                onInput={(val) => { setenRate(val) }}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Lot No"
              name="LotNO"
              rules={[
                {
                  required: true,
                  message: 'Please input lot no!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Item Track"
              name="ItmTrackId"
              rules={[
                {
                  required: true,
                  message: 'Please input Item Track!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Created Date"
              name="create_date"
              rules={[
                {
                  required: true,
                  message: 'Please input Created Date!',
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Expiry Date"
              name="expiry_date"
              rules={[
                {
                  required: true,
                  message: 'Please input Expiry Date!',
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Manufacturer"
              name="ManufactureId"
              rules={[
                {
                  required: true,
                  message: 'Please select Manufacturer!',
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
              label="Item Status"
              name="ItemStatus"
              rules={[
                {
                  required: true,
                  message: 'Please input Item Status!',
                },
              ]}
            >
              <Select allowClear>
                <Option value="0">Not Available</Option>
                <Option value="1">Available</Option>
              </Select>
            </Form.Item>

            <Descriptions
              bordered
              layout="horizontal"
              column={1}
              size="small"
            >
              <Descriptions.Item label="SubTotal">
                {totalCal}
              </Descriptions.Item>
            </Descriptions>

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
    </AddGoodsContainer>
  );
};

export default AddGoods;

const AddGoodsContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`