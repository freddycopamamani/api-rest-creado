import React, { Fragment } from 'react';

import clsx from 'clsx';


//import {  Box} from '@material-ui/core';

//import projectLogo from '../../assets/images/logocomibol.png';




const HeaderLogo = () => {
  
  return (
    <Fragment>
      <div className={clsx('app-header-logo', {})}>
        <span className="header-logo-text">Comibol</span>
      </div>
    </Fragment>
  );
};

export default HeaderLogo;
