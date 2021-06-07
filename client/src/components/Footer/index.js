import React from 'react';
import styled from 'styled-components';

export default function FooterCommponent() {
  return (
    <Footer>
      © CopyRights 2021 ASAP | All rights reserved | elice AI track 1st - AI
      project - Keyword Team2
    </Footer>
  );
}

const Footer = styled.footer`
  width: 100%;
  margin: auto;
  padding: 5px 0;
  text-align: center;
  color: gray;
  font-size: 12px;
`;
