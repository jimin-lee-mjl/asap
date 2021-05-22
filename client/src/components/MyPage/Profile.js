import React from 'react';

export default function Profile(user) {
  console.log(user);
  const { email, password, name } = user.user || {};
  return (
    <>
      <h1>Profile</h1>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dt>Password</dt>
      <dd>{password}</dd>
      <dt>Name</dt>
      <dd>{name}</dd>
    </>
  );
}
