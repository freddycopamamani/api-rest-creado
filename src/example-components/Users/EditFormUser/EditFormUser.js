import React, {useState, useEffect, useCallback} from 'react';
import { useDropzone } from 'react-dropzone'
import {
  Grid,
  makeStyles,
  Button,
  Avatar,
  InputAdornment
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Controls from '../../controls/Controls';
import Swal from 'sweetalert2';
import { updateUserApi, getAvatarApi, uploadAvatarApi } from '../../../api/user';
import {withRouter} from 'react-router-dom'
import noavatar from '../../../assets/images/avatars/no-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles =makeStyles(theme => ({
  boton: {
    textTransform: 'none'
  },
  paper: {
    maxWidth: 1020,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  label:{
    color: '#353c4e',
    marginBottom: '5px',
    fontSize: '13px',
    paddingLeft:'5px'
  },
  divider:{
    borderLeft: '2px solid #e0e0e0'
  },
  title:{
    margin: '16px',
    marginBottom: '15px',
    paddingBottom: '5px',
    borderBottom: '1px solid #e0e0e0',
    color: '#353c4e',
    textTransform: 'uppercase',
    letterSpacing: '5px'
  },
  left:{
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop:'20%',
    marginLeft:'5%'
   
  },

  gridAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    //borderBottom: '1px solid #acacac'
  },
  img:{
    width: '100px',
    height: '100px',
    boxShadow: '0 2px 20px 0 rgba(39, 52, 58, 0.08)',
    cursor: 'pointer',
  

  },
  divImg:{
    display:'table',
    margin: '0 auto',
    border: '2px solid #9a9a9a',
    borderStyle: 'dashed',
    padding:"10px",
    borderRadius: '100px',
    marginBottom: '20px'
  },
  icon:{
    color: '#acacac'
  }
}));



const AddFormCooperativas = (props) => {
  const classes = useStyles();
  const validationOnChange = true;
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState(null);

  const [values, setValues] = useState({});
    console.log(user);
    const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('name' in fieldValues){
        temp.name = fieldValues.name.length>3 ? "" : "Este campo es requerido.";
      }
      if('lastname' in fieldValues){
        temp.lastname = fieldValues.lastname ? "" : "Este campo es requerido."
      }
      if('email' in fieldValues){
        temp.email = fieldValues.email ? "" : "Este campo es requerido."
      }
      if('role' in fieldValues){
        temp.role = fieldValues.role ? "" : "Este campo es requerido."
      }
      setErrors({
        ...temp
      })

      if(fieldValues === values){
        return Object.values(temp).every(x => x === "")
      }
    }

    const handleInputChange = e => {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]:value
      })
      if(validationOnChange){
        validacion({[name] : value })
      }
    }

  useEffect(() => {
    setValues({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    });
  }, [user])

  useEffect(() => {
    if(user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      })
    } else {
      setAvatar(null)
    }
  }, [user]);

  useEffect(() => {
    if(avatar) {
      setValues( {...values, avatar: avatar.file})
    }
  }, [avatar])


    const handleUpdateUser = e => {
      e.preventDefault();
      if(validacion()){
        if(typeof values.avatar === "object") {
          uploadAvatarApi(values.avatar, user._id).then(response => {
            values.avatar = response.avatarName;
            updateUserApi(user._id, values).then(result => {
              Swal.fire({
                icon: 'success',  
                title:'¡Editar Usuario!',
                text: result,
                showConfirmButton: true,
              });
              setIsVisibleModal(false);
              setReloadUsers(true);
            });
          });
        } else {
          updateUserApi(user._id, values).then(result => {
            Swal.fire({
              icon: 'success',  
              title:'¡Editar Usuario!',
              text: result,
              showConfirmButton: true,
            });
            setIsVisibleModal(false);
            setReloadUsers(true);
          });
        }
      }
    }
  

  return (
    <>
      
      
        <Grid container spacing={1}>
          
          <form autoComplete="off" onSubmit={handleUpdateUser}>
            <Grid container spacing={1}>
              <Grid className={classes.gridAvatar} item xs={12} md={12}>
                <UploadAvatar avatar={avatar} setAvatar={setAvatar} classes={classes} />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Nombre:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca nombre"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon className={classes.icon} icon={['fas', 'user']} />
                      </InputAdornment>
                    ),
                  }}
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Apellidos:</h4>
                <Controls.Input 
                  fullWidth
                  placeholder="Introduzca apellidos"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon className={classes.icon} icon={['fas', 'user']} />
                      </InputAdornment>
                    ),
                  }}
                  name="lastname"
                  value={values.lastname}
                  onChange={handleInputChange}
                  error={errors.lastname}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Correo Electronico:</h4>
                <Controls.Input 
                  fullWidth
                  placeholder="Introduzca correo electronico"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon className={classes.icon} icon={['fas', 'envelope']} />
                      </InputAdornment>
                    ),
                  }}
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Rol de usuario:</h4>
                <Controls.Select 
                  fullWidth
                  size="small"
                  name="role"
                  value={values.role}
                  onChange={handleInputChange}
                  options = {[
                    {id:"admin", title: 'Administrador'},
                    {id:"emitir", title: 'Emitidor'},
                    {id:"admin", title: 'Controlador'}
                  ]}
                  error={errors.role}
                />
              </Grid>
              <Grid style={{paddingTop: '20px', paddingBottom:'10px'}} item xs={12} >
                <Button startIcon={<SaveIcon />} fullWidth type="submit"  variant="contained" size="small" color="primary" className={classes.boton} >
                  Actualizar
                </Button>
              </Grid>
            </Grid>
            
          </form>
        </Grid>
    </>
  );
};

function UploadAvatar(props) {
  const { avatar, setAvatar, classes } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if(avatar) {
      if(avatar.preview) {
        setAvatarUrl(avatar.preview);
      }else {
        setAvatarUrl(avatar)
      }
    } else { 
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  })

  return (
    <div className={classes.divImg} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar src={noavatar} className={classes.img} />
      ): (
        <Avatar src={avatarUrl ? avatarUrl : noavatar } className={classes.img} />
      )}
    </div>
  );
}

export default withRouter(AddFormCooperativas);


