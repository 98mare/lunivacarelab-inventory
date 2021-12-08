import { message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './useToken';
import { useDispatch } from 'react-redux';
import { getLoginApi } from '../../services/loginService';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';

export default function Login() {
  const dispatch = useDispatch();
  const { token, setToken } = useToken();
  const history = useHistory();

  const onFinish = (values) => {
    let data = {
      user: values?.username,
      pass: values?.password
    }
    dispatch(getLoginApi(data, (val) => {
      if (val.length !== 0) {
        let andd = val?.CheckValidLoginForInventory;
        if (andd[0]?.usruserid > 0) {
          setToken({ token: andd[0]?.usrUsername, username: andd[0]?.usrUsername, roleId: andd[0]?.usrrole, UId: andd[0]?.usruserid })
          console.log(token);
          history.push({
            pathname: '/'
          })
        } else {
          message.error('Username or password incorrect');
        }
      } else {
        message.error('Username or password incorrect')
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <LoginFormContainer>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoFocus={true} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

        </Form.Item>
      </Form>
    </LoginFormContainer>
  )
}

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .logo{
    width: 300px;
    img{
      width: 100%;
    }
  }
`