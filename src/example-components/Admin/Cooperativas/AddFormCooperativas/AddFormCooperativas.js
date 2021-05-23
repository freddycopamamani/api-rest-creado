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
import { createCooperativaApi } from '../../../../api/cooperativa';

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
  nombre_Coop:'',
  razonSocial_Coop:'',
  direccion_Coop:'',
  telefono_Coop:''
}

const AddFormCooperativas = () => {
  const classes = useStyles();

  const validationOnChange = true;

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('nombre_Coop' in fieldValues){
        temp.nombre_Coop = fieldValues.nombre_Coop.length>3 ? "" : "Este campo es requerido.";
      }
      if('razonSocial_Coop' in fieldValues){
        temp.razonSocial_Coop = fieldValues.razonSocial_Coop ? "" : "Este campo es requerido."
      }
      if('direccion_Coop' in fieldValues){
        temp.direccion_Coop = fieldValues.direccion_Coop ? "" : "Este campo es requerido."
      }
      if('telefono_Coop' in fieldValues){
        temp.telefono_Coop = fieldValues.telefono_Coop ? "" : "Este campo es requerido."
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
        createCooperativaApi(values)
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
      <Controls.Breadcrumb />
      <br/>
      <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Nueva Cooperativa</div>
          </div>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitCoop}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Controls.Input
                      size="small" 
                      fullWidth 
                      label="Nombre Cooperativa" 
                      name="nombre_Coop"
                      value={values.nombre_Coop}
                      onChange={handleInputChange}
                      error={errors.nombre_Coop}
                    />  
                </Grid>
                <Grid item xs={12} md={6} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Razon Social"
                      name="razonSocial_Coop"
                      value={values.razonSocial_Coop}
                      onChange={handleInputChange}
                      error={errors.razonSocial_Coop}
                      />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Dirección"
                      name="direccion_Coop"
                      value={values.direccion_Coop}
                      onChange={handleInputChange}
                      error={errors.direccion_Coop}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Telefono"
                      name="telefono_Coop"
                      value={values.telefono_Coop}
                      onChange={handleInputChange}
                      error={errors.telefono_Coop}
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

export default AddFormCooperativas;
