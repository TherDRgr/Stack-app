import React from 'react';
import stacklogo from './../stacklogo.png'

function LoginHeader() {
  return (
    <header className='auth-header'>
      <div className='logo'>
        <img className='slack-logo-auth' src={stacklogo} alt="stack-logo"/>
        </div>
        <div>
        <h1>Sign in to Stack</h1>
        <p>We suggest using an <strong>email address you use at work.</strong></p>
      </div>
    </header>
  );
}

export default LoginHeader;
