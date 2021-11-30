import { Form, Input, Button, DatePicker, Select, InputNumber, message, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getManuDetApi } from '../../services/itemManufactureService';
import { insertGoodsReceivedApi } from '../../services/labGoodsReceivedService';

const AddGoods = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [manuList, setmanuList] = useState([])

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    dispatch(
      getManuDetApi((val) => {
        setmanuList(val)
      })
    )
  },[])

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "GId": 0,
      "ItemId": values?.item_name,
      "Quantity": values?.qty,
      "Rate": values?.rate,
      "Total": values?.total,
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
              <Input />
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
              <InputNumber />
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
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Total"
              name="total"
              rules={[
                {
                  required: true,
                  message: 'Please input total!',
                },
              ]}
            >
              <InputNumber />
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
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={butDis}>
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