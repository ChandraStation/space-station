import './Header.css';

import { ReactComponent as BlackLogo } from 'images/logo-black.svg';
import { ReactComponent as WhiteLogo } from 'images/logo-white.svg';
import React from 'react';
import { ThemeType } from 'types';

type HeaderProps = {
  theme: ThemeType,
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <>
          { theme === ThemeType.Dark
            ? <WhiteLogo className="logo"/>
            : <BlackLogo className="logo"/>
          }
        </>
        <div className="logo-title-container">
          Now supporting&nbsp;<span className="logo-title-gravity-bridge">Gravity Bridge Chain Fees</span>&nbsp;and&nbsp;<span className="logo-title-gravity-bridge">wstETH Transfers</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
