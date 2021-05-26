import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth';

function RegisterPage(props) {
  const [username, setName] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setConfirmPasword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
    console.log(username);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(username, email, password1, password2);
    dispatch(register({ username, email, password1, password2 }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <h1>Create Account</h1>

        <label>Name</label>
        <input type="test" value={username} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={password1} onChange={onPasswordHanlder} />

        <label>Confirm Pasword</label>
        <input
          type="password"
          value={password2}
          onChange={onConfirmPasswordHandler}
        />

        <label>Email (선택)</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <br />

        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
