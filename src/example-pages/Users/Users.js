import React, { useState, useEffect } from 'react';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PageHeader from '../../example-components/PageHeader';
import ListUsers from 'example-components/Users/ListUsers';
import {getUsersActiveApi} from '../../api/user';

const Users = () => {

  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  

  useEffect(() => {
    getUsersActiveApi(true).then(response => {
      setUsersActive(response.users)
    })
    getUsersActiveApi(false).then(response => {
      setUsersInactive(response.users)
    })
    setReloadUsers(false);
  }, [reloadUsers])

  return (
    <>
      <PageHeader
        title="Usuarios"
        subTitle="Bienvenido a la sección de Usuarios, aqui podra crear, listar, editar y eliminar los usuarios registradas."
        icon={<PeopleAltRoundedIcon  fontSize="large" />}
      />
      <ListUsers 
        usersActive={usersActive} 
        usersInactive={usersInactive} 
        setReloadUsers={setReloadUsers} 
      />
    </>
  );
};

export default Users;
