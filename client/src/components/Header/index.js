import React from 'react';
import BasicHader from './BasicHeader';
// import GuestHeader from './GuestHeader';
import LogoHeader from './LogoHeader';
import LogoGuestHeader from './LogoGuestHeader';

export default function HeaderComponent({ type }) {
  return (
    <>
      {type === 'logo' && <LogoHeader />}
      {/* {type === 'guest' && <GuestHeader />} */}
      {type === undefined && <BasicHader />}
      {type === 'logo guest' && <LogoGuestHeader />}
    </>
  );
}
