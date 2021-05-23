import React, { useState} from 'react';
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Button,
  Avatar,
  InputAdornment
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Controls from '../../controls/Controls';
import Swal from 'sweetalert2';
import { crearUserAdminApi } from '../../../api/user';
import noavatar from '../../../assets/images/avatars/no-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import "./AddFormUser.scss";


const useStyles =makeStyles(theme => ({
  boton: {
    margin: theme.spacing(1),
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
  img:{
    width: '130px',
    height: '160px',
    marginBottom: '10px',
    boxShadow: '0 2px 20px 0 rgba(39, 52, 58, 0.08)',
    cursor: 'pointer'
  },
  icon:{
    color: '#acacac'
  }
}));

const initialFValues = {
  name:'',
  lastname:'',
  email:'',
  role:'',
  password:'',
  repeatPassword:''
}

const AddFormCooperativas = () => {
  const classes = useStyles();

  const validationOnChange = true;

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

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
      if('password' in fieldValues){
        temp.password = fieldValues.password ? "" : "Este campo es requerido."
      }
      if('repeatPassword' in fieldValues){
        temp.repeatPassword = fieldValues.repeatPassword ? "" : "Este campo es requerido."
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

    const resetForm = () => {
      setValues(initialFValues);
      setErrors({});
    }

    const handleSubmitCoop = e => {
      e.preventDefault();
      if(validacion()){
        crearUserAdminApi(values)
          .then(response => {
            console.log(response)
            if(response.code !== 200){
              Swal.fire({
                icon: 'error',
                title: '¡Crear Usuario!',
                text: response.message,
                showConfirmButton: true,
              })
              
            } else {
                Swal.fire({
                  icon: 'success',
                  title: '¡Crear Usuario!',
                  text: response.message,
                  showConfirmButton: true,
                })
                resetForm()
            }

          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              text: err,
              showConfirmButton: true,
            })
          })
      }
    }

  return (
    <>
      
      <Card elevation={3} className="card-box mb-4">
        <Grid container spacing={3}>
          <Grid  item xs={12} md={2}>
            <div className={classes.left}>
              <Avatar src={noavatar} variant="rounded" className={classes.img} />
              <h4 className={classes.label}>Agregar Imagen</h4>
            </div>
          </Grid>
          <Grid className={classes.divider} item xs={10}>
            <h3 className={classes.title}>Nuevo usuario</h3>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitCoop}>
            <Grid container spacing={4}>
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
                  placeholder="Introduzca "
                  name="role"
                  value={values.role}
                  onChange={handleInputChange}
                  options = {[
                    {id:"admin", title: 'Administrador'},
                    {id:"emitir", title: 'Emitidor'},
                    {id:"controlar", title: 'Controlador'}
                  ]}
                  error={errors.role} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Contraseña:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca contraseña"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon className={classes.icon} icon={['fas', 'key']} />
                      </InputAdornment>
                    ),
                  }}
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Repetir contraseña:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca contraseña"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon className={classes.icon} icon={['fas', 'key']} />
                      </InputAdornment>
                    ),
                  }}
                  name="repeatPassword"
                  value={values.repeatPassword}
                  onChange={handleInputChange}
                  error={errors.repeatPassword}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container justify="center"  direction="column" alignItems="center" spacing={10}>
              <Grid item xs={12} md={12}>
                <Button startIcon={<SaveIcon />} type="submit"  variant="contained" size="medium" color="primary" className={classes.boton} >
                  Guardar
                </Button>
                <Button startIcon={<ClearAllIcon />} variant="contained" size="medium" color="secondary" className={classes.boton} onClick={resetForm}>
                  Limpiar
                </Button>
              </Grid>
              
            </Grid>
          </form>
          </CardContent>
          </Grid>
        </Grid>
      </Card> 
    </>
  );
};

export default AddFormCooperativas;


/*
<>
      <br/>
      <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">Formulario Nuevo Usuario</h6>
            </div>
          </div>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitCoop}>
            <Grid container spacing={4} justify="center"  direction="column" alignItems="center">
              <Grid item xs={12} md={4}>
                <Avatar  className={classes.large} />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Nombre:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca nombre"
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
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Rol de usuario:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca Rol de usuario"
                  name="role"
                  value={values.role}
                  onChange={handleInputChange}
                  error={errors.role}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Contraseña:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca contraseña"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Repetir contraseña:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca contraseña"
                  type="password"
                  name="repeatPassword"
                  value={values.repeatPassword}
                  onChange={handleInputChange}
                  error={errors.repeatPassword}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container justify="center"  direction="column" alignItems="center" spacing={10}>
              <Grid item xs={12} md={12}>
                <Button startIcon={<SaveIcon />} type="submit"  variant="contained" size="medium" color="primary" className={classes.boton} >
                  Guardar
                </Button>
                <Button startIcon={<ClearAllIcon />} variant="contained" size="medium" color="secondary" className={classes.boton} onClick={resetForm}>
                  Limpiar
                </Button>
              </Grid>
              
            </Grid>
          </form>
          </CardContent>
      </Card> 
    </>
*/
