import React, {useState} from 'react';
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Controls from '../../../controls/Controls';
import Swal from 'sweetalert2';
import { createVehiculoApi } from '../../../../api/vehiculo';

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

const AddFormVehiculo = () => {
  const classes = useStyles();

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

    const handleSubmitVeh = e => {
      e.preventDefault();
      if(validacion()){
        createVehiculoApi(values)
          .then(response => {
            Swal.fire({
              icon: 'success',
              text: response,
              showConfirmButton: true,
            })
            resetForm()
          })
          .catch(err => {
            console.log(err);
          })
      }
    }

  return (
    <>
      
      <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Nuevo Vehiculo</div>
          </div>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitVeh}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Controls.Input
                      size="small" 
                      fullWidth 
                      label="Plata PTA" 
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
                      label="Poliza"
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
                      label="Capacidad"
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
  );
};

export default AddFormVehiculo;
