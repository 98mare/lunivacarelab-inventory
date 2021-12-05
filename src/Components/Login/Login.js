import { Modal } from 'antd';
import pMinDelay from 'p-min-delay';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './useToken';

function success() {
  Modal.success({
    content: 'Welccome user',

  });
}


export default function Login() {
  const { token, setToken } = useToken();
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
    if (data.user === 'admin' && data.pass === 'admin') {
      setToken({ token: data.user, username: 'Anib', roleId: 1, UId: 2 })
      history.push({
        pathname: '/'
      })
      pMinDelay(success(), 1000);
    } else {
      console.log('noo');
    }
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