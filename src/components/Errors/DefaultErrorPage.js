import React from 'react';
import { TiWarningOutline } from "react-icons/ti";
import Buttons from './../Buttons'
import { FaGooglePlay, FaAppStoreIos } from 'react-icons/fa'
import stack from './stack.png'

function DefaultErrorPage() {
  return (
      <div className='Error-page-container'>
          <header className='error-page-header-container'>
            <div className='errorpage-header-logo'>
            <a href="/login"><img src={stack} alt='stack-logo' width='106px' height='auto'/></a>
            </div>
            <div className='error-page-header-links'>
              <ul>
                <li>Product</li>
                <li>Pricing</li>
                <li>Support</li>
                <li>Create a new workspace</li>
                <li>Find your workspace</li>
              </ul>
            </div>
            <div className='error-page-header-login'>
              <Buttons>Sign In</Buttons>
            </div>
          </header>
          <main className='error-page-main-container'>
              <div className='error-container'>
                  <div className='error-title'>
                    <span className='warning-red'><TiWarningOutline/></span>
                    <span>Error initializing system...</span>
                  </div>
                  <br/>
                  <div className='error-message'>
                    <p>There was an error understanding the request. You can go back, or try looking on our <a href='http://get.slack.help/hc/en-us'>Help Center</a> if you need a hand.</p>
                  </div>
              </div>
          </main>
          <footer className='error-page-footer-container'>
            <div className='error-footer-links'>
              <div className='colfooter c1'>
                <span className='error-footer-links-title'>Using Stack</span>
                <div className='item-footer-link'>Product</div>
                <div className='item-footer-link'>Pricing</div>
                <div className='item-footer-link'>More Info</div>
              </div>
              <div className='colfooter c2'>
                <span className='error-footer-links-title'>Stack</span>
                <div className='item-footer-link'>Career</div>
                <div className='item-footer-link'>Users</div>
                <div className='item-footer-link'>Developers</div>
              </div>
              <div className='colfooter c3'>
                <span className='error-footer-links-title'>Legal</span>
                <div className='item-footer-link'>Privacy & Security</div>
                <div className='item-footer-link'>Product Info</div>
                <div className='item-footer-link'>Terms of Service</div>
              </div>
              <div className='colfooter c4'>
                <span className='error-footer-links-title'>Links</span>
                <div className='item-footer-link'><FaGooglePlay />Google Play</div>
                <div className='item-footer-link'><FaAppStoreIos/>App Store</div>
                <div className='item-footer-link'>Guidelines</div>
              </div>
            </div>
          </footer>
      </div>
  );
}

export default DefaultErrorPage;