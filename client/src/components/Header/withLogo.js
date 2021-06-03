import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import HeaderComponent from './index';

export default function LogoHeaderComponent() {
  const history = useHistory();

  return (
    <Container>
      <LogoWrapper>
        <Logo
          src="logo-circle.png"
          alt="logo"
          onClick={() => {
            history.push('/');
          }}
        />
      </LogoWrapper>

      <HeaderComponent />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 18rem;
  position: absolute;
  top: 0;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
`;

const Logo = styled.img`
  width: 15rem;
  margin: 2rem 0px;
  cursor: pointer;
`;
