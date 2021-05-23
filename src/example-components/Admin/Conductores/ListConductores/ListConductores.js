import React, { Fragment, useState} from 'react';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputAdornment, TablePagination, Grid, Avatar, Card, CardContent, Divider,  IconButton, Tooltip, makeStyles, Button } from '@material-ui/core';
import avatar2 from '../../../../assets/images/avatars/no-avatar.png';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteConductorApi, createConductorApi, updateConductorApi } from '../../../../api/conductor';
import Swal from 'sweetalert2';
import Controls from '../../../controls/Controls';
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CancelIcon from '@material-ui/icons/Cancel';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  boton: {
    margin: theme.spacing(1)
  },
  boton1: {
    margin: theme.spacing(1),
    textTransform: 'none',
    backgroundColor: 'red'
  },
  searchInput :{
    width: '100%'
  },
}));

const initialFValues = {
  nombre_Con: '',
  apellidos_Con: '',
  nroLicencia_Con: '',
  categoria_Con: ''
};




const ListConductores = (props) => {
  const { conductores, setReloadConductores } = props;
  const classes = useStyles();
  const validationOnChange = true;
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('');

  const pages = [5, 10, 25] 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [filterFn, setFilterFn] = useState({fn:items => {return items}});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0);
  }
  

  const TblPagination = () => (<TablePagination
    component="div"
    page={page}
    labelRowsPerPage="Filas por página"
    rowsPerPageOptions={pages}
    rowsPerPage={rowsPerPage}
    count={conductores.length}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
  />)

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn:items => {
        if(target.value === ""){
          return items;
        } else {
          return items.filter(x => x.nombre_Con.toLowerCase().includes(target.value));
        }
      }
    })
  }

  const conductoresAfterPagingAndsorting = () => {
    return filterFn.fn(conductores).slice(page*rowsPerPage, (page+1)*rowsPerPage);
  }

  const validacion = (fieldValues = values) => {
      let temp = {...errors}
      if('nombre_Con' in fieldValues){
        temp.nombre_Con = fieldValues.nombre_Con.length>3 ? "" : "Este campo es requerido.";
      }
      if('apellidos_Con' in fieldValues){
        temp.apellidos_Con = fieldValues.apellidos_Con ? "" : "Este campo es requerido."
      }
      if('nroLicencia_Con' in fieldValues){
        temp.nroLicencia_Con = fieldValues.nroLicencia_Con ? "" : "Este campo es requerido."
      }
      if('categoria_Con' in fieldValues){
        temp.categoria_Con = fieldValues.categoria_Con ? "" : "Este campo es requerido."
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
      if(!editing){
        if(validacion()){
          createConductorApi(values)
            .then(response => {
              Swal.fire({
                icon: 'success',
                title: '¡Crear Conductor!',
                text: response,
                showConfirmButton: true,
              })
              setReloadConductores(true)
            resetForm()
          })
          .catch(err => {
            console.log(err);
          })
      }
            
    } else {
      if(validacion()){
        updateConductorApi(id, values)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: '¡Actualizar conductor!',
            text: response,
            showConfirmButton: true,
          })
          setReloadConductores(true);
          resetForm();
          setEditing(false);
          setId('');
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }

  const updateConductor = (conductor) => {
    setId(conductor._id)
    setEditing(true)
    setValues(conductor)
  }

  const handleDeleteSocio = idSocio => {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Se borrara toda la información de la BD",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSocio(idSocio)
      }
    })
  }

  const deleteSocio = (id) => {
    deleteConductorApi(id)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminar Conductor!',
          text: response
        })
        setReloadConductores(true);
      })
  }

  const cancelar = () => {
    resetForm();
    setEditing(false);
    setId('');
  }
  

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
        <form autoComplete="off" onSubmit={handleSubmitCoop}>
          <Card elevation={3} className="card-box mb-4">
            <div className="card-header">
              <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
                {editing ? 'Editar Conductor' : 'Crear Conductor'}
              </h4>
            </div>
            <CardContent className="p-3">
              <Controls.Input  
                margin="normal" 
                size="small"
                label="Nombre" 
                fullWidth
                name="nombre_Con"
                value={values.nombre_Con}
                onChange={handleInputChange}
                error={errors.nombre_Con}
              />
              <Controls.Input 
                margin="normal" 
                size="small" 
                variant="outlined" 
                label="Apellidos" 
                fullWidth
                name="apellidos_Con"
                value={values.apellidos_Con}
                onChange={handleInputChange}
                error={errors.apellidos_Con}
              />
              <Controls.Input 
                margin="normal" 
                size="small" 
                variant="outlined" 
                label="Nro. de Licencia" 
                fullWidth
                name="nroLicencia_Con"
                value={values.nroLicencia_Con}
                onChange={handleInputChange}
                error={errors.nroLicencia_Con}
              />
              <Controls.Input 
                margin="normal" 
                size="small" 
                variant="outlined" 
                label="Categoria" 
                fullWidth
                name="categoria_Con"
                value={values.categoria_Con}
                onChange={handleInputChange}
                error={errors.categoria_Con}
              />
              <Button 
                className={classes.boton} 
                size="small" 
                startIcon={<SaveIcon />} 
                variant="contained" 
                color="primary" 
                type="submit"
              >
                {editing ? 'Actualizar' : 'Guardar'}
              </Button>
              {
                editing ? <Button 
                startIcon={<CancelIcon />} 
                variant="contained" 
                size="small"
                color="primary" 
                className={classes.boton1} 
                onClick={cancelar}>
              Cancelar
            </Button> : 
              <Button 
              className={classes.boton} 
              size="small" 
              startIcon={<ClearAllIcon />} 
              variant="contained" 
              color="secondary"
              onClick={resetForm}
              >
              Limpiar
              </Button>
            }
            </CardContent>
          </Card>
        </form>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card className="card-box mb-4">
            <div className="card-header">
              <Controls.Input 
                className={classes.searchInput}
                label="Buscar Conductor"
                size="small"
                InputProps={{
                  startAdornment: (<InputAdornment>
                    <Search />
                  </InputAdornment>)
                }}
                onChange={handleSearch}

              />
            </div>
            <CardContent className="p-3">
            {
              conductoresAfterPagingAndsorting().map((conductor) => (
                <>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex" >
                      <div className="d-flex align-items-center" key={conductor._id}>
                        <Avatar alt="..." src={avatar2} className="mr-2" />
                        <div>
                          <a
                            href="#/"
                            onClick={e => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            {`${conductor.nombre_Con} ${conductor.apellidos_Con}`}
                          </a>
                          <span className="text-black-50 d-block">
                            {conductor.nroLicencia_Con}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Tooltip arrow title="Editar">
                        <IconButton className="m-2 btn text-success" onClick={() => updateConductor(conductor)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title="Eliminar">
                        <IconButton className="m-2 btn text-danger" onClick={() => handleDeleteSocio(conductor._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <Divider className="my-0" />
                </>
              ))
            }
            </CardContent>
            <TblPagination />
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ListConductores;


