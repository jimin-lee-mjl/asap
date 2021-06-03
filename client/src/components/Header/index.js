import React from 'react';
import BasicHeader from './BasicHeader';
import GuestHeader from './GuestHeader';
import LogoHeader from './LogoHeader';

export default function HeaderComponent({ type }) {
  return (
    <>
      {type === 'logo' && <LogoHeader />}
      {type === 'guest' && <GuestHeader />}
      {type === true && <BasicHeader />}
    </>
  );
}
