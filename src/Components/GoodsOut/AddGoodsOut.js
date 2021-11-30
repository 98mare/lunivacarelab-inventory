import { Form, Input, Button, DatePicker, Select, InputNumber, message, Row, Col, Descriptions, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { insertGoodsOutApi } from '../../services/labGoodsOutService';
import { getTestListApi } from '../../services/itemVsRatioService';

const AddGoodsOut = () => {
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([])
  const [testList, settestList] = useState([])

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
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

    dispatch(getTestListApi((val) => {
      settestList(val)
    }))
  }

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "GOId": 0,
      "TestId": values?.test_id,
      "ItemId": values?.item_name,
      "GoodReceivedNo": values?.good_no,
      "Quantity": values?.qty,
      "UserId": 1,
      "GoodsOutDate": values?.good_date.format('YYYY-MM-DD'),
      "IsActive": values?.isactive,
      "Remarks": values?.remarks
    }
    dispatch(insertGoodsOutApi(data, (res) => {
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
    <AddGoodsOutContainer>
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
              label="Test"
              name="test_id"
              rules={[
                {
                  required: true,
                  message: 'Please input Test!',
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="select a test"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear>
                {testList?.map(iTy => {
                  return (
                    <Option
                      title={iTy?.Testname}
                      key={iTy?.Id}
                      value={iTy?.Id}>
                      {iTy?.Testname}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Item Name"
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
              label="Goods Received No"
              name="good_no"
              rules={[
                {
                  required: true,
                  message: 'Please input Goods Received No!',
                },
              ]}
            >
              <InputNumber />
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
              label="Goods out Date"
              name="good_date"
              rules={[
                {
                  required: true,
                  message: 'Please input Goods out Date!',
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
              />
            </Form.Item>

            <Form.Item
              label="Remarks"
              name="remarks"
              rules={[
                {
                  required: true,
                  message: 'Please input remarks!',
                },
              ]}
            >
              <TextArea />
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
              <Button type="primary" htmlType="submit" disabled={butDis}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </AddGoodsOutContainer>
  );
};

export default AddGoodsOut;

const AddGoodsOutContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`