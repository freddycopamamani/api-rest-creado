import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Controls from '../../../controls/Controls';
import Swal from 'sweetalert2';
import { getVehiculoByIdApi, updateVehiculoApi } from '../../../../api/vehiculo';
import {withRouter} from 'react-router-dom'

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
  nroPlaca_Veh: '',
  poliza_Veh: '',
  clase_Veh: '',
  marca_Veh: '',
  color_Veh: '',
  capacidad_Veh: '',
  tipo_Veh: '',
  modelo_veh: '',
}

const EditFormVehiculo = (props) => {
  const classes = useStyles();
  const { id } = props.match.params;
  const validationOnChange = true;

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('nroPlaca_Veh' in fieldValues){
        temp.nroPlaca_Veh = fieldValues.nroPlaca_Veh.length>3 ? "" : "Este campo es requerido.";
      }
      if('poliza_Veh' in fieldValues){
        temp.poliza_Veh = fieldValues.poliza_Veh ? "" : "Este campo es requerido."
      }
      if('clase_Veh' in fieldValues){
        temp.clase_Veh = fieldValues.clase_Veh ? "" : "Este campo es requerido."
      }
      if('marca_Veh' in fieldValues){
        temp.marca_Veh = fieldValues.marca_Veh ? "" : "Este campo es requerido."
      }
      if('color_Veh' in fieldValues){
        temp.color_Veh = fieldValues.color_Veh ? "" : "Este campo es requerido."
      }
      if('capacidad_Veh' in fieldValues){
        temp.capacidad_Veh = fieldValues.capacidad_Veh ? "" : "Este campo es requerido."
      }
      if('tipo_Veh' in fieldValues){
        temp.tipo_Veh = fieldValues.tipo_Veh ? "" : "Este campo es requerido."
      }
      if('modelo_veh' in fieldValues){
        temp.modelo_veh = fieldValues.modelo_veh ? "" : "Este campo es requerido."
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

    const handleSubmitVehiculo = e => {
      e.preventDefault();
      if(validacion()){
        updateVehiculoApi(id, values)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: '¡Editar Vehiculo!',
              text: response,
              showConfirmButton: true,
            })
            props.history.push('/Vehiculos')
            resetForm()
          })
          .catch(err => {
            console.log(err);
          })
      }
    }

    const cancelButton = () => {
      props.history.push('/Vehiculos');
    }

  useEffect(() => {
    const getVehiculo = () => {
      getVehiculoByIdApi(id)
        .then(response => {
          setValues(response.vehiculoById)  
      })
    }
  
    getVehiculo()
  }, [id]);

  return (
    <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Actualizar Vehiculo</div>
          </div>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitVehiculo}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Controls.Input
                      size="small" 
                      fullWidth 
                      label="Placa PTA" 
                      name="nroPlaca_Veh"
                      value={values.nroPlaca_Veh}
                      onChange={handleInputChange}
                      error={errors.nroPlaca_Veh}
                    />  
                </Grid>
                <Grid item xs={12} md={3} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Póliza"
                      name="poliza_Veh"
                      value={values.poliza_Veh}
                      onChange={handleInputChange}
                      error={errors.poliza_Veh}
                      />
                </Grid>
                <Grid item xs={12} md={3} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Clase"
                      name="clase_Veh"
                      value={values.clase_Veh}
                      onChange={handleInputChange}
                      error={errors.clase_Veh}
                    />
                </Grid>
                <Grid item xs={12} md={3} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Marca"
                      name="marca_Veh"
                      value={values.marca_Veh}
                      onChange={handleInputChange}
                      error={errors.marca_Veh}
                />
                </Grid>
                <Grid item xs={12} md={3} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Color"
                      name="color_Veh"
                      value={values.color_Veh}
                      onChange={handleInputChange}
                      error={errors.color_Veh}
                />
                </Grid>
                <Grid item xs={12} md={3} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      type="number"
                      label="Capacidad Carga (Tn.)"
                      name="capacidad_Veh"
                      value={values.capacidad_Veh}
                      onChange={handleInputChange}
                      error={errors.capacidad_Veh}
                />
                </Grid>
                <Grid item xs={12} md={3} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Tipo"
                      name="tipo_Veh"
                      value={values.tipo_Veh}
                      onChange={handleInputChange}
                      error={errors.tipo_Veh}
                />
                </Grid>
                <Grid item xs={12} md={3} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Modelo"
                      name="modelo_veh"
                      value={values.modelo_veh}
                      onChange={handleInputChange}
                      error={errors.modelo_veh}
                />
                </Grid>
            </Grid>
            <Grid container justify="center"  direction="column" alignItems="center" spacing={10}>
              <Grid item xs={12} md={12}>
                <Button startIcon={<SaveIcon />} type="submit"  variant="contained" size="medium" color="primary" className={classes.boton} >
                  Actualizar
                </Button>
                <Button startIcon={<CancelIcon />} variant="contained" size="medium" color="secondary" className={classes.boton1} onClick={cancelButton}>
                  Cancelar
                </Button>
              </Grid>
              
            </Grid>
          </form>
          </CardContent>
      </Card> 
  );
};

export default  withRouter (EditFormVehiculo);
