import React, { Fragment } from 'react';

import clsx from 'clsx';

import { Paper, Link, Typography } from '@material-ui/core';

import { connect } from 'react-redux';

const Footer = props => {
  const { footerFixed } = props;
  return (
    <Fragment>
      <Paper
        square
        className={clsx('app-footer text-black-50', {
          'app-footer--fixed': footerFixed
        })}>
        
          <div className="app-footer--second">
          <Typography  variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://www.comibol.gob.bo/">
              Corporación Minera de Bolivia
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
          </div>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed
});
export default connect(mapStateToProps)(Footer);
