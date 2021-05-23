import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import {
  Hidden,
  IconButton,
  AppBar,
  Box,
  Tooltip,
  Badge,
  InputBase,
  makeStyles
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SearchIcon from '@material-ui/icons/Search';

import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/logocomibol.png';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const useStyles = makeStyles((theme) => ({
  badge:{
    '& .MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle' : {
      color: '#fff',
      backgroundColor: '#f4772e'
    }
  },
  searchInput : {
    opacity : '0,6',
    padding :`0px ${theme.spacing(1)}px`,
    fontSize : '0.8rem',
    borderRadius: '5px',
    '&:hover' : {
      backgroundColor:'#f2f2f2'
    },
    '& .MuiSvgIcon-root':{
      marginRight : theme.spacing(1)
    }
  },
  badgenotification: {
    color: '#f4772e',
    backgroundColor: '#f4772e'
  }
}));

const Header = props => {
  const classes = useStyles();
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;

  return (
    <Fragment>
      <AppBar
        color="primary"
        className={clsx('app-header', {})}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box
              className="app-logo-wrapper"
              title="Carolina React Admin Dashboard with Material-UI Free">
              <Link to="/DashboardDefault" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn">
                  <img
                    className="app-logo-img"
                    alt="Comibol"
                    src={projectLogo}
                  />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">Comibol</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center">
            <InputBase 
              placeholder="Buscar"
              className={classes.searchInput}
              startAdornment ={<SearchIcon fontSize="small" />}
            />
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center" >
            <IconButton >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon fontSize="small"/>
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="secondary">
                <ChatBubbleIcon  fontSize="small"/>
              </Badge>
            </IconButton>
            <HeaderUserbox />
            <Box className="toggle-sidebar-btn-mobile">
              <Tooltip title="Toggle Sidebar" placement="right">
                <IconButton
                  color="inherit"
                  onClick={toggleSidebarMobile}
                  size="medium">
                  {sidebarToggleMobile ? (
                    <MenuOpenRoundedIcon />
                  ) : (
                    <MenuRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
