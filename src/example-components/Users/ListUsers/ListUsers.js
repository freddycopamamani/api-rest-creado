import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Card, Switch, CardContent, Tooltip, Button,  IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import StopIcon from '@material-ui/icons/Stop';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom';
import avatar3 from '../../../assets/images/avatars/no-avatar.png';
import { activateUserApi, deleteUserApi } from '../../../api/user';
import Swal from 'sweetalert2';
import Modal from '../../Modal';
import EditFormUser from '../EditFormUser';
import { getAvatarApi} from '../../../api/user';



const ListUsers = (props) => {
  const {usersActive, usersInactive, setReloadUsers} = props;
  
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
    <Card elevation={3} className="card-box ">
      <div className="card-header pr-2">
          <div className="card-header--title">
            <Switch defaultChecked onChange={() => setViewUsersActives(!viewUsersActives)} color="primary"/>
            <span className="font-weight-bold font-size-lg mb-1 text-black">
              {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
            </span>
          </div>
          <div className="card-header--actions">
            <Tooltip arrow title="Nuevo usuario">
              <Link to="/Users/new">
                <Button  startIcon={<AddIcon />} variant="contained" color="primary" size="small">Agregar</Button>
              </Link>
            </Tooltip>
          </div>
      </div>
      {
        viewUsersActives ? 
        (<UsersActive 
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers} />
        ) 
        : 
        (<UsersInactive 
          usersInactive={usersInactive} 
          setReloadUsers={setReloadUsers} />
        )
      }
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </Card>
    </>
  );
};


function UsersActive(props) {
  const {usersActive, setReloadUsers, setIsVisibleModal, setModalTitle, setModalContent} = props;

  const handleDeleteCooperativa = user => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Un usuario desactivado no podrá iniciar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, desactivar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        desactivateUser(user._id)
      }
    })
  }

  const desactivateUser = (user) => {
    activateUserApi(user, false)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title:'¡Desactivar Usuario!',
          text: response,
          showConfirmButton: true,
        })
        setReloadUsers(true);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title:'¡Desactivar Usuario!',
          text: err,
          showConfirmButton: true,
        })
      })
  }

  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(`Editar: ${user.name} ${user.lastname}`)
    setModalContent(<EditFormUser user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />)
  }

  return (
    <CardContent>
      <div className="d-flex flex-row flex-wrap justify-content-center  text-center">
        {
          usersActive.map(user => (
            <UserActive user={user} editUser={editUser} handleDeleteCooperativa={handleDeleteCooperativa} />
          ))
        }
      </div>
    </CardContent>
  );
}

function UserActive(props) {
  const {user, editUser, handleDeleteCooperativa } = props;
  const [avatar, setAvatar] = useState(null);

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
    <div key={user._id} className="position-relative px-5 py-3">
              <div className="divider-v divider-v-lg" />
              <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                  <div className="rounded-circle overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar ? avatar : avatar3 } />
                  </div>
                </div>
              </div>
              <div className="font-weight-bold mt-1">{`${user.name} ${user.lastname}`}</div>
              <div>
              <Tooltip arrow title="Editar">
              
                <IconButton  onClick={() => editUser(user)} size="small" className="m-2 btn text-primary">
                  <FontAwesomeIcon  icon={['fas', 'user-edit']} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Dasactivar">
              <IconButton size="small" color="secondary" onClick={() => handleDeleteCooperativa(user)}>
                <FontAwesomeIcon  icon={['fas', 'lock']} />
              </IconButton>
              </Tooltip>
              </div>
            </div>
  )
}

function UsersInactive(props) {
  const {usersInactive, setReloadUsers} = props;

  const activateUser = (user) => {
    activateUserApi(user._id, true)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title:'¡Activar Usuario!',
          text: response,
          showConfirmButton: true,
        })
        setReloadUsers(true);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title:'¡Desactivar Usuario!',
          text: err,
          showConfirmButton: true,
        })
      })
  }

  const handleDeleteUser = user => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se podrá recuperar al usuario ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUser(user._id)
      }
    })
  }

  const eliminarUser = (user) => {
    deleteUserApi(user)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title:'¡Eliminar Usuario!',
          text: response,
          showConfirmButton: true,
        })
        setReloadUsers(true);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title:'¡eliminar Usuario!',
          text: err,
          showConfirmButton: true,
        })
      })
  }

  return(
    <CardContent>
      <div className="d-flex flex-row flex-wrap justify-content-center  text-center">
        {
          usersInactive.map(user => (
            <UserInactive  user={user} activateUser={activateUser} handleDeleteUser={handleDeleteUser} />
          ))
        }
      </div>
    </CardContent>
  );
}

function UserInactive(props) {
  const { user, activateUser, handleDeleteUser } = props;
  const [avatar, setAvatar] = useState(null);

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
    <div key={user._id} className="position-relative px-5 py-3">
              <div className="divider-v divider-v-lg" />
              <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                  <div className="rounded-circle overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar ? avatar : avatar3} />
                  </div>
                </div>
              </div>
              <div className="font-weight-bold mt-1">{`${user.name} ${user.lastname}`}</div>
              <div>
              <Tooltip arrow title="Activar">
                <IconButton size="small" className="m-2 btn text-primary" onClick={() => activateUser(user)}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Eliminar">
              <IconButton size="small" className="text-danger"  onClick={() => handleDeleteUser(user)}>
                  <DeleteForeverRoundedIcon />
              </IconButton>
              </Tooltip>
              </div>
            </div>
  )

}

export default ListUsers;


/*<CardHeader title={<div className="my-3">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Usuarios Activos
          </h6>
      </div>} /> 
      
      
  <div className="card-header pr-2">
        <Switch color="primary" size="medium" className="mb-1" />
        <h6 className="font-weight-bold font-size-lg mb-1 text-black">
          Usuarios Activos
        </h6>
      </div>  
      
*/
