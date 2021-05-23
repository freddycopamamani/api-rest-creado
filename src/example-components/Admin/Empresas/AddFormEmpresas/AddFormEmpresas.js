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
import { createempresaApi } from '../../../../api/empresa';
import { ExampleWrapperSeamless } from '../../../../layout-components'

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
  nombreComercial_Emp: '',
  nroMatricula_Emp: '',
  ciudad_Emp: '',
  tipoDeSociedad_Emp: '',
  representanteLegal_Emp: '',
  ciRepresentanteLegal_Emp: '',
  direccion_Emp: ''
}

const AddFormEmpresas = () => {

  const classes = useStyles();

  const validationOnChange = true;

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('nombreComercial_Emp' in fieldValues){
        temp.nombreComercial_Emp = fieldValues.nombreComercial_Emp.length>3 ? "" : "Este campo es requerido.";
      }
      if('nroMatricula_Emp' in fieldValues){
        temp.nroMatricula_Emp = fieldValues.nroMatricula_Emp ? "" : "Este campo es requerido."
      }
      if('ciudad_Emp' in fieldValues){
        temp.ciudad_Emp = fieldValues.ciudad_Emp ? "" : "Este campo es requerido."
      }
      if('tipoDeSociedad_Emp' in fieldValues){
        temp.tipoDeSociedad_Emp = fieldValues.tipoDeSociedad_Emp ? "" : "Este campo es requerido."
      }
      if('representanteLegal_Emp' in fieldValues){
        temp.representanteLegal_Emp = fieldValues.representanteLegal_Emp ? "" : "Este campo es requerido."
      }
      if('ciRepresentanteLegal_Emp' in fieldValues){
        temp.ciRepresentanteLegal_Emp = fieldValues.ciRepresentanteLegal_Emp ? "" : "Este campo es requerido."
      }
      if('direccion_Emp' in fieldValues){
        temp.direccion_Emp = fieldValues.direccion_Emp ? "" : "Este campo es requerido."
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

    const handleSubmitEmp = e => {
      e.preventDefault();
      if(validacion()){
        createempresaApi(values)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title:'¡Agregar Empresa!',
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
      <ExampleWrapperSeamless sectionHeading="Registrar nueva empresa" />
      <Card elevation={3} className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">Formulario de Empresa </div>
          </div>
          <CardContent className="p-3">
          <form autoComplete="off" onSubmit={handleSubmitEmp}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Controls.Input
                      size="small" 
                      fullWidth 
                      label="Nombre Comercial de la Empresa" 
                      name="nombreComercial_Emp"
                      value={values.nombreComercial_Emp}
                      onChange={handleInputChange}
                      error={errors.nombreComercial_Emp}
                    />  
                </Grid>
                <Grid item xs={12} md={6} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Numero de Matricula"
                      name="nroMatricula_Emp"
                      value={values.nroMatricula_Emp}
                      onChange={handleInputChange}
                      error={errors.nroMatricula_Emp}
                      />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Departamento"
                      name="ciudad_Emp"
                      value={values.ciudad_Emp}
                      onChange={handleInputChange}
                      error={errors.ciudad_Emp}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Tipo de Sociedad"
                      name="tipoDeSociedad_Emp"
                      value={values.tipoDeSociedad_Emp}
                      onChange={handleInputChange}
                      error={errors.tipoDeSociedad_Emp}
                />
                </Grid>
                <Grid item xs={12} md={4} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Nombre de Representante Legal"
                      name="representanteLegal_Emp"
                      value={values.representanteLegal_Emp}
                      onChange={handleInputChange}
                      error={errors.representanteLegal_Emp}
                />
                </Grid>
                <Grid item xs={12} md={4} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Ci de Representante Legal"
                      name="ciRepresentanteLegal_Emp"
                      value={values.ciRepresentanteLegal_Emp}
                      onChange={handleInputChange}
                      error={errors.ciRepresentanteLegal_Emp}
                />
                </Grid>
                <Grid item xs={12} md={4} >
                <Controls.Input 
                      size="small"  
                      fullWidth 
                      label="Dirección de la Empresa"
                      name="direccion_Emp"
                      value={values.direccion_Emp}
                      onChange={handleInputChange}
                      error={errors.direccion_Emp}
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

export default AddFormEmpresas;
