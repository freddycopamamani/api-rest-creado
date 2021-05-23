import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Route, Redirect } from "react-router-dom";
import Login from '../../example-pages/SignIn';
import useAuth from '../../hooks/useAuth'

import { connect } from 'react-redux';

import { Sidebar, Header, Footer } from '../../layout-components';

const LeftSidebar = props => {
  const {user, isLoading } = useAuth();
  
    if(!user && !isLoading) {
      return (
        <>
          
            <Route path="/Login" component={Login} />
            <Redirect to="/Login" />
          
        </>
      )  
    }
  const {
    children,
    sidebarToggle,
    sidebarFixed,
    footerFixed,
    contentBackground
  } = props;

  if(user && !isLoading) {
    return (
      <Fragment>
        <div className={clsx('app-wrapper', contentBackground)}>
          <Header />
          <div
            className={clsx('app-main', {
              'app-main-sidebar-static': !sidebarFixed
            })}>
            <Sidebar />
            <div
              className={clsx('app-content', {
                'app-content-sidebar-collapsed': sidebarToggle,
                'app-content-sidebar-fixed': sidebarFixed,
                'app-content-footer-fixed': footerFixed
              })}>
              <div className="app-content--inner">
                <div className="app-content--inner__wrapper">{children}</div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  return null;
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarFixed: state.ThemeOptions.sidebarFixed,

  headerFixed: state.ThemeOptions.headerFixed,
  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

  footerFixed: state.ThemeOptions.footerFixed,

  contentBackground: state.ThemeOptions.contentBackground
});

export default connect(mapStateToProps)(LeftSidebar);
