import React from 'react';

const Header = () => {
    return (
        <nav>
        <div className="nav-wrapper">
          <div className="brand-logo right">Logo</div>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
          </ul>
        </div>
      </nav>
    );
}

export default Header