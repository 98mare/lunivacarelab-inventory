import { Modal, Table } from 'antd';
import pMinDelay from 'p-min-delay';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './useToken';
// import { useDispatch } from 'react-redux';
// import { getLoginApi } from '../../services/loginService';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';

function success() {
  Modal.success({
    content: 'Welcome user',
    
  });
}


export default function Login() {
  // const { setToken } = props;
  // const dispatch = useDispatch();
  const {token, setToken} = useToken();
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    let data = {
      user: username, 
      pass: password
    }
    ///here function call
    if(data.user === 'admin' && data.pass === 'admin'){
      setToken({token: data.user, username: 'Anib', roleId: 1, UId: 2})
      // setTimeout(() => {
        // if(token !== undefined){
          history.push({
            pathname: '/'
          })
          pMinDelay(success(), 2000);
        // }
      // }, 1000);
    }else{
      console.log('noo');
    }
    // dispatch(getLoginApi(data, (val) => {
    //   console.log(val);
    // }))
  }

  
    const onFinish = (values) => {
      let data = {
        user: values?.username, 
        pass: values?.password
      }
      ///here function call
      if(data.user === 'admin' && data.pass === 'admin'){
        setToken({token: data.user, username: 'Anib', roleId: 1, UId: 2})
        // setTimeout(() => {
        //   if(token !== undefined){
            history.push({
              pathname: '/'
            })
            // pMinDelay(success(), 2000);
        //   }
        // }, 1000);
      }else{
        console.log('noo');
      }
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  return (
    <LoginFormContainer>
    {/* <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input onChange={val => { setUsername(val.target.value) }} type="text" />
      </label>
      <label>
        <p>Password</p>
        <input onChange={val => { setPassword(val.target.value) }} type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form> */}
    <div className="logo">
      <img src="./Assets/images/logo.png" alt="" />
    </div>

    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      // onSubmitCapture={handleSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        onChange={val => { setUsername(val.target.value) }}
      >
        <Input autoFocus="true" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        onChange={val => { setPassword(val.target.value) }} 
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

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