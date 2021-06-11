import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Steps } from 'antd';
import Category from './Category';
import Keyword from './Keyword';
import { useHistory } from 'react-router-dom';
import HeaderComponent from '../Header';
import { recommendFilter } from '../../actions/userSelect';

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
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const category = useSelector((state) => state.userSelect.selectedCategories);
  const keyword = useSelector((state) => state.userSelect.selectedKeywords);

  return (
    <>
      {isAuthenticated ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )}
      <Wrapper>
        <MySteps current={current} style={{ marginBottom: '3rem' }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </MySteps>

        <div
          className="steps-content"
          style={{
            width: '100%',
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            textAlign: 'left',
          }}
        >
          {steps[current].content}
        </div>

        <div className="steps-action" style={{ marginTop: '3rem' }}>
          {current > 0 && (
            <OutLinedButton style={{ margin: 'auto' }} onClick={() => prev()}>
              Previous
            </OutLinedButton>
          )}
          {current < steps.length - 1 && (
            <Button onClick={() => next()}>Next</Button>
          )}
          {current === steps.length - 1 && (
            <Button
              onClick={() => {
                dispatch(recommendFilter(category, keyword));
                history.push('/recommend');
              }}
            >
              Done
            </Button>
          )}
        </div>
      </Wrapper>
    </>
  );
}

export default UserInfo;

const Wrapper = styled.div`
  flex: 1;
  width: 40%;
  height: 70vh;
  margin: 15rem auto 5rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Button = styled.button`
  background: #ff6f00;
  width: 8rem;
  height: 4rem;
  border: 0.1rem solid #ff6f00;
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
    box-shadow: 2px 4px 8px #c4c4c4;
  }
`;

const OutLinedButton = styled(Button)`
  background: #fff;
  color: #ff6f00;
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
