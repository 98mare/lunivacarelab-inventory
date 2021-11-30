import { Form, Input, Button, DatePicker, Select, InputNumber, message, Row, Col, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getManuDetApi } from '../../services/itemManufactureService';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { insertGoodsReceivedApi } from '../../services/labGoodsReceivedService';

const AddGoods = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([])
  const [manuList, setmanuList] = useState([])
  const [enQty, setenQty] = useState(0);
  const [enRate, setenRate] = useState(0);
  const [totalCal, settotalCal] = useState(0);

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {

    dispatch(
      getManuDetApi((val) => {
        setmanuList(val)
      })
    )
    getAllLabItem()
  }, [])

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
      "GId": 0,
      "ItemId": values?.item_name,
      "Quantity": values?.qty,
      "Rate": values?.rate,
      "Total": totalCal,
      "ExpiryDate": values?.expiry_date.format("YYYY-MM-DD"),
      "ManufactureId": values?.manu_id,
      "LotNo": values?.lot_no,
      "ItmTrackId": values?.itm_track_id,
      "CreatedDate": values?.create_date.format("YYYY-MM-DD"),
      "CreatedBy": 1,
      "ItemStatus": values?.itm_stat,
    }
    dispatch(insertGoodsReceivedApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg == true) {
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

  useEffect(() => {
    calculateTotal()
  }, [enQty, enRate])

  const calculateTotal = () => {
    let newTotal = enQty * enRate;
    settotalCal(newTotal)
  }

  return (
    <AddGoodsContainer>
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
              label="Item name"
              name="item_name"
              rules={[
                {
                  required: true,
                  message: 'Please input item name!',
                },
              ]}
            >
              <Select allowClear>
                {itemList?.map(iTy => {
                  return (
                    <Option value={iTy?.TId}>
                      {iTy?.ItemName}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="qty"
              rules={[
                {
                  required: true,
                  message: 'Please input quantity!',
                },
              ]}
            >
              <InputNumber
                onInput={(val) => { setenQty(val) }}
              />
            </Form.Item>

            <Form.Item
              label="Rate"
              name="rate"
              rules={[
                {
                  required: true,
                  message: 'Please input rate!',
                },
              ]}
            >
              <InputNumber
                onInput={(val) => { setenRate(val) }}
              />
            </Form.Item>

            <Form.Item
              label="Lot No"
              name="lot_no"
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
              name="itm_track_id"
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
              <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item
              label="Manufacturer"
              name="manu_id"
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
              name="itm_stat"
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
              <Button  htmlType="submit" disabled={butDis} className='btnPrimary'>
                Submit
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
`