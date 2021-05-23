import React, {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Controls from '../../../controls/Controls';
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from 'sweetalert2';
import { updateBocaminaApi, getBocaminaByIdApi } from '../../../../api/bocamina';
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
  nombre_Boc: '',
  lat_Boc: '',
  long_Boc: '',
  cota_Boc: ''
}

const EditFormBocamina = (props) => {

  const classes = useStyles();

  const { id } = props.match.params;

  const validationOnChange = true;

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('nombre_Boc' in fieldValues){
        temp.nombre_Boc = fieldValues.nombre_Boc.length>3 ? "" : "Este campo es requerido.";
      }
      if('lat_Boc' in fieldValues){
        temp.lat_Boc = fieldValues.lat_Boc ? "" : "Este campo es requerido."
      }
      if('long_Boc' in fieldValues){
        temp.long_Boc = fieldValues.long_Boc ? "" : "Este campo es requerido."
      }
      if('cota_Boc' in fieldValues){
        temp.cota_Boc = fieldValues.cota_Boc ? "" : "Este campo es requerido."
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
      props.history.push('/Bocaminas');
    }

    const handleSubmitCoop = e => {
      e.preventDefault();
      if(validacion()){
        updateBocaminaApi(id, values)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title:'¡Editar bocamina!',
              text: response,
              showConfirmButton: true,
            })
            props.history.push('/Bocaminas');
            resetForm()
          })
          .catch(err => {
            console.log(err);
          })
      }
  }

  useEffect(() => {
    const getBocamina = () => {
      getBocaminaByIdApi(id)
        .then(response => {
          setValues(response.BocById)  
        })
      }

      getBocamina()
  }, [id]);


  return (
    <>
      <Controls.Breadcrumb />
      <br/>
      <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Crear Bocamina</div>
          </div>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitCoop}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Controls.Input
                      size="small" 
                      fullWidth 
                      label="Nombre Bocamina" 
                      name="nombre_Boc"
                      value={values.nombre_Boc}
                      onChange={handleInputChange}
                      error={errors.nombre_Boc}
                    />  
                </Grid>
                <Grid item xs={12} md={6} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Latitud"
                      name="lat_Boc"
                      value={values.lat_Boc}
                      onChange={handleInputChange}
                      error={errors.lat_Boc}
                      />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Longitud"
                      name="long_Boc"
                      value={values.long_Boc}
                      onChange={handleInputChange}
                      error={errors.long_Boc}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Altura"
                      name="cota_Boc"
                      value={values.cota_Boc}
                      onChange={handleInputChange}
                      error={errors.cota_Boc}
                />
                </Grid>
            </Grid>
            <Grid container justify="center"  direction="column" alignItems="center" spacing={10}>
              <Grid item xs={12} md={12}>
                <Button startIcon={<SaveIcon />} type="submit"  variant="contained" size="medium" color="primary" className={classes.boton} >
                  Actualizar
                </Button>
                <Button startIcon={<CancelIcon />} variant="contained" size="medium" color="primary" className={classes.boton1} onClick={cancelar}>
                  Cancelar
                </Button>
              </Grid>
              
            </Grid>
          </form>
          </CardContent>
      </Card>
    </>
  );
};

export default withRouter(EditFormBocamina);
