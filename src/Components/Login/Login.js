import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLoginApi } from '../../services/loginService';

export default function Login(props) {
  const { setToken } = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    let data = {
      user: username, 
      pass: password
    }
    // dispatch(getLoginApi(data, (val) => {
    //   console.log(val);
    // }))
    setToken({token: 'anib123', username: 'Anib', roleId: 1, UId: 2})
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