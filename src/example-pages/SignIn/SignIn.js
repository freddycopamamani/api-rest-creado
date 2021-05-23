import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from 'example-components/Admin/LoginForm';
import { getAccessTokenApi } from '../../api/auth'
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatarsvg from '../../assets/images/piscina.svg'

import "./SignIn.scss";

const useStyles =  makeStyles(theme => ({
  logo:{
    background: '#8360c3',
    //eslint-disable-next-line 
    background: '-webkit-linear-gradient(to right, #2ebf91, #8360c3)',  /* Chrome 10-25, Safari 5.1-6 */
    //eslint-disable-next-line
    background: 'linear-gradient(to right, #2ebf91, #8360c3)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    position: 'absolute',
    top:'0', 
    right:'0', 
    left:'0', 
    bottom:'0'
  }
}))
const SignIn = () => {
  const classes = useStyles();
  if(getAccessTokenApi()) {
    return <Redirect to="/DashboardDefault" />;
  }

  
  const container = document.querySelector(".container");

  const sign_in_btn = () => {
    container.classList.add("sign-up-mode");
  }
  const sign_up_btn = () => {
    container.classList.remove("sign-up-mode");
  }

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <LoginForm />
          <form className="sign-up-form">
            <h2 className="title">Registrarte</h2>
            <div className="input-field">
              <FontAwesomeIcon className="icon" icon={['fas', 'user']} />
              <input type="text" placeholder="Correo Electronico" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon className="icon" icon={['fas', 'envelope']} />
              <input type="text" placeholder="Correo Electronico" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon className="icon" icon={['fas', 'lock']} />
              <input type="password" placeholder="Contraseña" />
            </div>
            <input type="submit" className="btn solid" value="Registrarte" />
            <p className="social-text">Or sign in with social platforms</p>
            <div className="social-media">
              <a href="/#" className="social-icon">
                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
              </a>
              <a href="/#" className="social-icon">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </a>
              <a href="/#" className="social-icon">
                <FontAwesomeIcon icon={['fab', 'google']} />
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>CORPORACIÓN MINERA DE BOLIVIA</h3>
            <p>
            La Corporación Minera de Bolivia (COMIBOL) fue creada mediante Decreto Supremo 
            31196 dictado el 2 de octubre de 1952. 
            </p>
            <button className="btn1 transparent" onClick={sign_in_btn} id="sign-up-btn">
              Registrarte
            </button>
          </div>
          <img src={avatarsvg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>CORPORACIÓN MINERA DE BOLIVIA</h3>
            <p>
              La Corporación Minera de Bolivia (COMIBOL) fue creada mediante Decreto Supremo 
              31196 dictado el 2 de octubre de 1952.
            </p>
            <button className="btn1 transparent" onClick={sign_up_btn} id="sign-in-btn">
              Iniciar sesión
            </button>
          </div>
          <img src={avatarsvg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;



