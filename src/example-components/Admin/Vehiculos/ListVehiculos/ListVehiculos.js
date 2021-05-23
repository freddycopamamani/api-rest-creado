import React, { Fragment } from 'react';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {  Avatar, Tooltip, Card, CardContent, Divider, makeStyles, Button } from '@material-ui/core';
import avatar2 from '../../../../assets/images/avatars/4e64085d0730a12bf677ec9e2e7a0f69 (1).png';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { deleteVehiculoApi } from '../../../../api/vehiculo';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  boton: {
    margin: theme.spacing(1)
  },
  boton1: {
    margin: theme.spacing(1),
    textTransform: 'none',
    backgroundColor: 'red'
  },
}));

const ListSocios = (props) => {
  const { vehiculos, setReloadVehiculos } = props;
  const classes = useStyles();
  

  const handleDeleteVehiculo = idvehiculo => {
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
        deleteVehiculo(idvehiculo)
      }
    })
  }

  const deleteVehiculo = (id) => {
    deleteVehiculoApi(id)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminar Vehiculo!',
          text: response
        })
        setReloadVehiculos(true);
      })
  }

  
  

  return (
    <Fragment>
          <Card className="card-box mb-4">
          <div className="card-header">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
              Lista de Vehiculos
            </h4>
          </div>
          <div className="card-header--actions">
            <Tooltip arrow title="Vehiculo">
              <Link to="/Vehiculos/new">
                <Button  startIcon={<AddIcon />} variant="contained" color="primary" size="small">Nuevo</Button>
              </Link>
            </Tooltip>
          </div>
        </div>
            <CardContent className="p-3">
            {
              vehiculos.map(vehiculo => (
                <>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex" >
                      <div className="d-flex align-items-center" key={vehiculo._id}>
                        <Avatar style={{width:'100px', height:'100px', padding:'10px'}} variant="rounded" alt="..." src={avatar2} className="mr-2" />
                        <div>
                          <a
                            href="#/"
                            onClick={e => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Nro. de Placa
                          </a>
                          <span className="text-black-50 d-block">
                            {vehiculo.nroPlaca_Veh}
                          </span>
                        </div>
                        
                        <div style={{paddingLeft:'30px'}}>
                          <a
                            href="#/"
                            onClick={e => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Tipo de Vehiculo
                          </a>
                          <span className="text-black-50 d-block">
                            {vehiculo.tipo_Veh}
                          </span>
                        </div>
                        <div style={{paddingLeft:'30px'}}>
                          <a
                            href="#/"
                            onClick={e => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Marca de Vehiculo
                          </a>
                          <span className="text-black-50 d-block">
                            {vehiculo.marca_Veh}
                          </span>
                        </div>
                        <div style={{paddingLeft:'30px'}}>
                          <a
                            href="#/"
                            onClick={e => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Estado
                          </a>
                          <span className=" btn-pill badge badge-danger d-block">
                            inactivo
                        
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Tooltip arrow title="Editar">
                        <Link to = {`/Vehiculos/${vehiculo._id}/editar`}>
                          <Button className={classes.boton} startIcon={<EditIcon />} size="small" variant="contained" color="primary">
                            Editar
                          </Button>
                        </Link>
                      </Tooltip>
                      <Tooltip arrow title="Eliminar">
                        <Button className={classes.boton} startIcon={<DeleteIcon />} size="small" variant="contained" color="secondary" onClick={() => handleDeleteVehiculo(vehiculo._id)}>
                          Eliminar
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <Divider className="my-3" />
                </>
              ))
            }
            </CardContent>
          </Card>
    </Fragment>
  );
};

export default ListSocios;


