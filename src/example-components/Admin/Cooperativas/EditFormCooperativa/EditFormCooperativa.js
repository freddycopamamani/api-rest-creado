import React, {useState, useEffect} from 'react';
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
import {withRouter} from 'react-router-dom'
import { getCooperativaByIdApi, updateCooperativaApi } from '../../../../api/cooperativa';

const useStyles =makeStyles(theme => ({
  boton: {
    margin: theme.spacing(1),
    textTransform: 'none',
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
  nombre_Coop:'',
  razonSocial_Coop:'',
  direccion_Coop:'',
  telefono_Coop:''
}

const AddFormCooperativas = (props) => {
  const classes = useStyles();
  const { id } = props.match.params;

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
      props.history.push('/Cooperativas');
    }

    



    const handleSubmitCoop = e => {
      e.preventDefault();
      if(validacion()){
        updateCooperativaApi(id, values)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title:'¡Editar cooperativa!',
              text: response,
              showConfirmButton: true,
            })
            props.history.push('/Cooperativas')
            resetForm()
          })
          .catch(err => {
            console.log(err);
          })
      }
    }


  useEffect(() => {
    const getClient = () => {
      getCooperativaByIdApi(id)
        .then(response => {
          setValues(response.CoopById)  
        })
      }

      getClient()
  }, [id]);

  return (
    <>
      <Controls.Breadcrumb />
      <br/>
      <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Actualizar Cooperativa</div>
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
                <Button startIcon={<CancelIcon />} variant="contained" size="medium" color="primary" className={classes.boton1} onClick={resetForm}>
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

export default withRouter(AddFormCooperativas);
