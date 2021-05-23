import React, {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Button,
  
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Controls from '../../../controls/Controls';
import Swal from 'sweetalert2';
import { createBocaminaApi } from '../../../../api/bocamina';
import { getCooperativaApi } from '../../../../api/cooperativa';
import { Autocomplete } from '@material-ui/lab';

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
  nombre_Boc: '',
  lat_Boc: '',
  long_Boc: '',
  cota_Boc: '',
  cooperativa:0
}

const AddFormBocamina = (props) => {

  const { match} = props
  const classes = useStyles();
  const validationOnChange = true;
  
  

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const [cooperativas, setCooperativas] = useState([]);
    
    
    //console.log(cooperativas)

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

      if('cooperativa' in fieldValues){
        temp.cooperativa = fieldValues.cooperativa ? "" : "Este campo es requerido."
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
        createBocaminaApi(values)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: '¡Crear Bocamina!',
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

  useEffect(() => {
    cooperativasLista();
  }, []);

  const cooperativasLista = () => {
    getCooperativaApi().then(response => {
      let listaCooperativas = response.listaCoop.map(item => ({
        id : item._id,
        title : item.nombre_Coop
      }));
      listaCooperativas = [{ id: 0, title: 'Seleccione' }].concat(listaCooperativas);
      setCooperativas(listaCooperativas)
    }).catch(err => console.log(err))
  }

  
  

  //console.log(cooperativas)
  return (
    <>
      
      <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Crear Bocamina</div>
          </div>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitCoop}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} >
                <Controls.Select
                  name="cooperativa"
                  label="Cooperativa"
                  value={values.cooperativa}
                  onChange={handleInputChange}
                  options = {cooperativas}
                  error={errors.cooperativa}
                />
              </Grid>
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
                  Enviar
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



export default AddFormBocamina;

