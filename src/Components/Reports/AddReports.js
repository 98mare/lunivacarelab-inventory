import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { getLocationApi } from '../../services/itemLocationService';
import { insertRackDetailsApi } from '../../services/itemRackService';

const AddReports = () => {
  // const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  // const [locationList, setlocationList] = useState([])

  // useEffect(() => {
  //   dispatch(
  //     getLocationApi((val) => {
  //       setlocationList(val)
  //     })
  //   )
  // }, [])

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "RId": 0,
      "RackCode": values?.rack_code,
      "RackName": values?.rack_name,
      "LocationId": values?.location,
      "IsActive": values?.isactive
    }
    dispatch(insertRackDetailsApi(data, (res) => {
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
    <AddReportsContainer>
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
              label="Rack Code"
              name="rack_code"
              rules={[
                {
                  required: true,
                  message: 'Please input rack code!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rack name"
              name="rack_name"
              rules={[
                {
                  required: true,
                  message: 'Please input Rack name!',
                },
              ]}
            >
              <Input />
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
    </AddReportsContainer>
  );
};

export default AddReports;

const AddReportsContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`