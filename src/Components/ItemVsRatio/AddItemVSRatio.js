import { Form, Button, DatePicker, Select, InputNumber, message, Row, Col, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { getTestListApi, insertItemVsRatioApi } from '../../services/itemVsRatioService';

const AddItemVsRatio = () => {
  const { Option } = Select;
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
      "RId": 0,
      "ItemId": values?.item_name,
      "TestId": values?.test_name,
      "ItemPerUnitTest": values?.item_per,
      "IsActive": values?.isactive,
      "CreatedDate": values?.create_date.format('YYYY-MM-DD'),
      "CreatedBy": 1
    }
    dispatch(insertItemVsRatioApi(data, (res) => {
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
    <AddItemVsRatioContainer>
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
              label="Test Name"
              name="test_name"
              rules={[
                {
                  required: true,
                  message: 'Please select test!',
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
              label="Item Per Unit Test"
              name="item_per"
              rules={[
                {
                  required: true,
                  message: 'Please input Item Per Unit Test!',
                },
              ]}
            >
              <InputNumber />
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
    </AddItemVsRatioContainer>
  );
};

export default AddItemVsRatio;

const AddItemVsRatioContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`