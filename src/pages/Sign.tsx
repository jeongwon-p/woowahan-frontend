import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ajax from '../infra/Ajax';
import { actions } from '../infra/redux/AppWidgets';
import { GlobalReduxState } from '../infra/redux/GlobalReducer';

const Sign: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const signing = useSelector((state: GlobalReduxState) => state.app.signing);

  if (signing) history.push('/');

  const login = () => {
    ajax.post('http://localhost:8001/login', {
      emailId: email,
      password
    }).then((response) => {
      dispatch(actions.signInSuccess(response.data.token));
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <h1>LOGIN</h1>
      <TextField
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type='text'
        placeholder='email'
      />
      <br/>
      <TextField
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type='password'
        placeholder='password'
      />
      <br/>
      <br/>
      <Button variant='contained' color='primary' onClick={login}>Login</Button>
    </>
  );
};

export default Sign;
