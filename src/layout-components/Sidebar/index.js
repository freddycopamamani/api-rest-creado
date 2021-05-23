import React, { Fragment } from 'react';

import clsx from 'clsx';
import jwtDecode from 'jwt-decode';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, Drawer, Paper, Avatar, Divider, Typography } from '@material-ui/core';

import { connect } from 'react-redux';

import SidebarHeader from '../../layout-components/SidebarHeader';
import SidebarMenu from '../../layout-components/SidebarMenu';

import navItems from './navItems';
import navItemsControlador from './navItemsControlador';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import avatar from '../../assets/images/logocomibol.png'
import { getAccessTokenApi } from '../../api/auth';

const Sidebar = props => {
  const {
    setSidebarToggleMobile,
    sidebarToggleMobile,
    sidebarFixed,

    sidebarShadow
  } = props;

  const token = getAccessTokenApi();
  const user = jwtDecode(token);
  //console.log(user);

  const closeDrawer = () => setSidebarToggleMobile(!sidebarToggleMobile);

  const sidebarMenuContent = (
    user.role === "Administrador" ? <div>
    {navItems.map(list => (
      <SidebarMenu
        component="div"
        key={list.label}
        pages={list.content}
        title={list.label}
      />
    ))}
  </div> : 
  <div>
  {navItemsControlador.map(list => (
    <SidebarMenu
      component="div"
      key={list.label}
      pages={list.content}
      title={list.label}
    />
  ))}
</div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
        color="#333"
          anchor="left"
          open={sidebarToggleMobile}
          onClose={closeDrawer}
          variant="temporary"
          elevation={4}
          className="app-sidebar-wrapper-lg">
          <SidebarHeader />
          <PerfectScrollbar>{sidebarMenuContent}</PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          className={clsx('app-sidebar-wrapper', {
            'app-sidebar-wrapper-fixed': sidebarFixed
          })}
          square
          elevation={sidebarShadow ? 11 : 3}>
          <SidebarHeader />
          <div
            className={clsx({
              'app-sidebar-menu': sidebarFixed
            })}>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
            <div style={{ margin:'10px', display:'flex', justifyContent : 'center', alignItems : 'center', flexDirection:'column'}}>
             <Avatar variant="rounded" src={avatar} style={{width:'80px', height:'80px', margin:'10px',  padding:'1px'}} />
             <Typography style={{color:'#fff', fontSize:'17px'}}>Control - Tornaguias</Typography>
            </div>
            <Divider variant="middle" style={{backgroundColor:'#fff'}}/>
              {sidebarMenuContent}
            </PerfectScrollbar>
          </div>
        </Paper>
      </Hidden>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
