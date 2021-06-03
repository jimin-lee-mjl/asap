import React from 'react';
import styled from 'styled-components';
import { Steps, Button, message } from 'antd';
import Personal from './Personal';
import Category from './Category';
import Keyword from './Keyword';
import { useHistory } from 'react-router-dom';
import HeaderComponent from '../Header';

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: <Personal />,
  },
  {
    title: 'Second',
    content: <Category />,
  },
  {
    title: 'Last',
    content: <Keyword />,
  },
];

function UserInfo() {
  const history = useHistory();

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Container>
      <HeaderComponent type="logo" />
      <div style={{ width: '40%' }}>
        <Steps
          current={current}
          labelPlacement="vertical"
          style={{ marginBottom: '50px' }}
        >
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div
          className="steps-content"
          style={{
            minHeight: '420px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontFamily: 'Noto Sans KR',
            textAlign: 'left',
          }}
        >
          {steps[current].content}
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => history.push('/recommend')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: 'auto' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </Container>
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
