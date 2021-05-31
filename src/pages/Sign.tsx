import { push } from 'connected-react-router';
import React, { useState } from 'react';
import ajax from '../infra/Ajax';

const Sign: React.FC = ({ signing }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    ajax.post('http://localhost:8001/login', {
      emailId: email,
      password
    }).then(() => {
      push({ pathname: '/', signing });
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <h1>Login</h1>
      <p>Email</p>
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type='text'
        placeholder='email'
      />
      <p>Password</p>
      <input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type='password'
        placeholder='password'
      />
      <button type='button' onClick={handleClick}>Login</button>
    </>
  );
};

export default Sign;
