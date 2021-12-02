import { Modal, Table } from 'antd';
import pMinDelay from 'p-min-delay';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { getLoginApi } from '../../services/loginService';

function success() {
  Modal.success({
    content: 'Welccome user',
    
  });
}


export default function Login() {
  // const { setToken } = props;
  // const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    let data = {
      user: username, 
      pass: password
    }
    if(data.user === 'admin' && data.pass === 'admin'){
      history.push({
        pathname: '/'
      })
      pMinDelay(success(), 1000);
    }else{
      console.log('noo');
    }
    // dispatch(getLoginApi(data, (val) => {
    //   console.log(val);
    // }))
    // setToken({token: 'anib123', username: 'Anib', roleId: 1, UId: 2})
  }

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  )
}