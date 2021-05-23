import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, makeStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Controls from '../../../controls/Controls';
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import { updateSocioApi, getSocioByIdApi } from '../../../../api/socio';
//import { getBocaminasApi } from '../../../../api/bocamina'


const useStyles =makeStyles(theme => ({
  boton: {
    margin: theme.spacing(1),
    textTransform: 'none'
  },
  boton1: {
    margin: theme.spacing(1),
    textTransform: 'none',
    backgroundColor: 'red'
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
}));


const initialFValues = {
  bocamina: '',
  nombre_Soc: '',
  apellidos_Soc: '',
  ci_Soc: '',
  numCelular_Soc: '',
};

const EditFormSocio = (props) => {

  const classes = useStyles();
  const validationOnChange = true;
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  //const [bocaminas, setBocaminas] = useState([]);
  const { id } = props.match.params;

  const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('bocamina' in fieldValues){
        temp.bocamina = fieldValues.bocamina.length ? "" : "Este campo es requerido.";
      }
      if('nombre_Soc' in fieldValues){
        temp.nombre_Soc = fieldValues.nombre_Soc.length>3 ? "" : "Este campo es requerido.";
      }
      if('apellidos_Soc' in fieldValues){
        temp.apellidos_Soc = fieldValues.apellidos_Soc ? "" : "Este campo es requerido."
      }
      if('ci_Soc' in fieldValues){
        temp.ci_Soc = fieldValues.ci_Soc ? "" : "Este campo es requerido."
      }
      if('numCelular_Soc' in fieldValues){
        temp.numCelular_Soc = fieldValues.numCelular_Soc ? "" : "Este campo es requerido."
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
    const cancelar = () => {
      props.history.push('/Socios');
    }

    const handleSubmitCoop = e => {
      e.preventDefault();
      if(validacion()){
        updateSocioApi(id, values)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title:'¡Editar Socio!',
              text: response,
              showConfirmButton: true,
            })
            props.history.push('/Socios');
            resetForm()
          })
          .catch(err => {
            console.log(err);
          })
      }
  }

  useEffect(() => {
    const getSocio = () => {
      getSocioByIdApi(id)
        .then(response => {
          setValues(response.SocById);  
        })
      }

      getSocio()
  }, [id]);

  /*useEffect(() => {
    BocaminaLista();
  }, []);

  console.log(values);

  const BocaminaLista = () => {
    getBocaminasApi().then(response => {
      let listaBocaminas = response.bocaminas.map(item => ({
        id : item._id,
        title : item.nombre_Boc
      }));
      listaBocaminas = [{ id: 0, title: 'Seleccione' }].concat(listaBocaminas);
      setBocaminas(listaBocaminas)
    }).catch(err => console.log(err))
  }

  console.log(bocaminas)*/
  return (
    <form autoComplete="off" onSubmit={handleSubmitCoop}>
      <Card elevation={3} className="card-box mb-4">
        <div className="card-header">
          <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
            Editar Socio
          </h4>
        </div>
        <CardContent className="p-3">
          <Controls.Input  
            margin="normal" 
            size="small"
            label="Nombre Socio" 
            fullWidth
            name="nombre_Soc"
            value={values.nombre_Soc}
            onChange={handleInputChange}
            error={errors.nombre_Soc}
          />
          <Controls.Input 
            margin="normal" 
            size="small" 
            variant="outlined" 
            label="Apellidos" 
            fullWidth
            name="apellidos_Soc"
            value={values.apellidos_Soc}
            onChange={handleInputChange}
            error={errors.apellidos_Soc}
          />
          <Controls.Input 
            margin="normal" 
            size="small" 
            variant="outlined" 
            label="Cedula de Identidad"
            fullWidth
            name="ci_Soc"
            value={values.ci_Soc}
            onChange={handleInputChange}
            error={errors.ci_Soc}
          />
          <Controls.Input 
            margin="normal" 
            size="small" 
            variant="outlined" 
            label="Nro. de Celular" 
            fullWidth
            name="numCelular_Soc"
            value={values.numCelular_Soc}
            onChange={handleInputChange}
            error={errors.numCelular_Soc}
          />
          <Button 
            className={classes.boton} 
            size="small" 
            startIcon={<SaveIcon />} 
            variant="contained" 
            color="primary" 
            type="submit"
          >
            Guardar
          </Button>
          <Button 
            className={classes.boton1} 
            size="small" 
            startIcon={<CancelIcon />} 
            variant="contained" 
            color="secondary"
            onClick={cancelar}
          >
            Cancelar
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default withRouter(EditFormSocio);
