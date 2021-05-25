import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { login } from '../../actions/auth';
import { useSelector, useDispatch } from 'react-redux';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Login() {
  const state = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const login = async (email, password) => {
  //   const response = await axios
  //     .post('https://fakestoreapi.com/auth/login', {
  //       username: email,
  //       password: password,
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log(response);
  // };

  const handleClick = () => {
    try {
      dispatch(login(email, password));
    } catch (e) {
      alert('Failed to login');
      setEmail('');
      setPassword('');
    }
    // console.log(state);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <h1>Login</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Id"
          name="id"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          rules={[
            {
              required: true,
              message: 'Please input your id!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={handleClick}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Link to="/register">Create Account</Link>
    </div>
  );
}
