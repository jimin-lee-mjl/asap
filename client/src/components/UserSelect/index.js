import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Steps, message } from 'antd';
import Personal from './Personal';
import Category from './Category';
import Keyword from './Keyword';
import { Link, useHistory } from 'react-router-dom';
import HeaderComponent from '../Header';

import Gender from './Gender';

const { Step } = Steps;

const steps = [
  {
    title: 'Gender',
    content: <Gender />,
  },
  {
    title: 'Categories',
    content: <Category />,
  },
  {
    title: 'Keywords',
    content: <Keyword />,
  },
];

function UserInfo() {
  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      {isAuthenticated ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )}
      <Wrapper>
        <MySteps current={current} style={{ marginBottom: '50px' }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </MySteps>

        <div
          className="steps-content"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            textAlign: 'left',
          }}
        >
          {steps[current].content}
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button onClick={() => next()}>Next</Button>
          )}
          {current === steps.length - 1 && (
            <Button onClick={() => history.push('/recommend')}>Done</Button>
          )}
          {current > 0 && (
            <Button style={{ margin: 'auto' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Wrapper>
    </>
  );
}

export default UserInfo;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 40%;
  height: calc(100% - 25rem);
  margin: 20rem auto 5rem auto;
  padding: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Button = styled.button`
  background: #ff6f00;
  width: 10rem;
  height: 4rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  color: white;
  margin: 0 3vw;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2;
  margin: 5px 0;

  :hover {
    color: white;
    box-shadow: 2px 4px 8px #ffb300;
  }
`;

const MySteps = styled(Steps)`
  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
    background-color: #ff6f00;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    border-color: #ff6f00;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: #ff6f00;
  }
  .anticon {
    color: #ff6f00;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: #ff6f00;
  }
`;
