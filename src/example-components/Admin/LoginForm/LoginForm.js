import React, {useState} from 'react';
import { 
  Box,
  Button, 
  Container, 
  Divider,
  Typography } from '@material-ui/core';
import logo from '../../../assets/images/avatars/icono 2.png'
import Controls from '../../controls/Controls';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';
import Notification from '../../Notification';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { validatePasswordModerate } from '../../../Validation/Validation';


  const initialFValues = {
    email: '',
    password: '',
  }

  const LoginForm = () => {
    const validationOnChange = true;

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})

    const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('email' in fieldValues){
        const emailRegex = (/^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        temp.email = emailRegex.test(fieldValues.email) ? "" : "Correo electronico no valido"
      }
      if('password' in fieldValues){
        const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
        temp.password = passwordRegex.test(fieldValues.password) ? '' : 'Contraseña incorrecta'
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

  const handleSubmitLogin = async e => {
    e.preventDefault();
    if(validacion()){
      const result = await signInApi(values);
      //console.log(result)
      if(result.message) {
        setNotify({
          isOpen:true,
          message: result.message,
          type: 'error'
        })
      }else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        setNotify({
          isOpen:true,
          message: "Login Correcto",
          type: 'success'
        });
        window.location.href = "/DashboardDefault";
      }
    }
  }

  const responseGoogle = (response) => {
    
    console.log(response);
  }

  return (
    <>
    <form onSubmit={handleSubmitLogin} autoComplete="off" className="sign-in-form">
      <h2 className="title">Acceso al Sistema</h2>
      <div className="input-field">
        <FontAwesomeIcon className="icon" icon={['fas', 'envelope']} />
        <input 
          type="email" 
          placeholder="Correo Electronico"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-field">
        <FontAwesomeIcon className="icon" icon={['fas', 'lock']} />
        <input 
          type="password" 
          placeholder="Contraseña"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn1 solid">Iniciar sesión</button>
      <p className="social-text">O inicia sesión con plataformas sociales</p>
      <div className="social-media">
        <a href="/#" className="social-icon">
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </a>
        <a href="/#" className="social-icon">
          <FontAwesomeIcon icon={['fab', 'google']} />
        </a>
      </div>
    </form>
    <Notification
    notify={notify}
    setNotify={setNotify}
  />
  </>
  );
};

export default LoginForm;




/*
  <>
      <Container maxWidth="xs" >
      <Box
        bgcolor="#fff"
        boxShadow="10"
        borderRadius="12px"
        textAlign="center"
        p="25px"
        mt="100px"
      >
        <img alt="props" src={logo} height="100px"/>
        <Typography variant="h5" color="textSecondary">
          Iniciar Sesión
        </Typography>
                
        <Divider style={{backgroundColor:'#002E5B'}} variant="middle" />
        <br/>
        <form autoComplete="off" onSubmit={handleSubmitLogin}>
          <Controls.Input
            margin="normal"
            fullWidth
            label="Correo electronico"
            size="small"
            variant="standard"
            type="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            size="small"
            variant="standard"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />      
          <br />
          <br/>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            //onClick={handleIngresarSistema}
          >
            Ingresar
          </Button>
        </form>
        <br/>
        {/* <GoogleLogin
          clientId="554732082817-oinlps66ekthdf8v8pie8fqnitu2l5u7.apps.googleusercontent.com"
          buttonText="SESION GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        /> }
        </Box>
        </Container>
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        </>
*/
