import React, { Fragment, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import {
  Avatar,
  Box,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider,
  withStyles,
  Badge,
  IconButton
} from '@material-ui/core';

import avatar5 from '../../assets/images/avatars/no-avatar.png';
import { logout, getAccessTokenApi } from '../../api/auth';
import { getAvatarApi } from '../../api/user';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  
}))(Badge);

export default function HeaderUserbox() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = getAccessTokenApi();
  const user = jwtDecode(token);
  //console.log(user);

  const logoutUser = () => {
    logout()
    window.location.reload();
  };


  useEffect(() => {
    if(user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response)
      })
    } else {
      setAvatar(null)
    }
  }, [user])

  return (
    <Fragment>
      <Button
       
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
            variant="dot"
          >
            <Avatar variant="circle" sizes="44" alt="Emma Taylor" src={avatar ? avatar : avatar5} />
          </StyledBadge>
          
        </Box>
        <div className="d-none d-xl-block pl-3">
          <div className="font-weight-bold pt-2 line-height-1">Ryan Kent</div>
          <span className="text-white-50">Senior React Developer</span>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className="ml-2">
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <Box>
              <Avatar sizes="44" alt="Emma Taylor" src={avatar ? avatar : avatar5} />
            </Box>
            <div className="pl-3  pr-3">
              <div className="font-weight-bold text-center pt-2 line-height-1">
                {`${user.name} ${user.lastname}`}
              </div>
              <div className=" text-center">
                <span className="text-black-50 text-center">
                  {user.role}
                </span>
              </div>
            </div>
            <Divider className="w-100 mt-2" />
            <ListItem button>Mi Cuenta</ListItem>
            <ListItem button>Configurar Perfil</ListItem>
            <Divider className="w-100" />
            <ListItem className="d-block rounded-bottom px-3 pt-3 pb-0 text-center">
              <Tooltip arrow title="Cerrar Sesión">
                <IconButton onClick={logoutUser} >
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}
