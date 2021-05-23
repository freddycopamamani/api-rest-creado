import React, {useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Box, Avatar, Card, Divider, InputAdornment, CardContent, TablePagination, IconButton, Tooltip, makeStyles, Button } from '@material-ui/core';
import avatar2 from '../../../../assets/images/avatars/no-avatar.png';
import { deleteSociosApi } from '../../../../api/socio';
import Swal from 'sweetalert2';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Constrols from '../../../../example-components/controls/Controls';
import { Search } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  boton: {
    marginRight: theme.spacing(2)
  },
  boton1: {
    margin: theme.spacing(1),
    textTransform: 'none',
    backgroundColor: 'red'
  },
  searchInput :{
    width: '75%'
  },
}));




const ListSocios = (props) => {
  
  const { socios, setReloadSocios } = props;
  const classes = useStyles()

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
    count={socios.length}
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
          return items.filter(x => x.ci_Soc.toLowerCase().includes(target.value));
        }
      }
    })
  }

  const empresasAfterPagingAndsorting = () => {
    return filterFn.fn(socios).slice(page*rowsPerPage, (page+1)*rowsPerPage);
  }

  const handleDeleteSocio = socio => {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Se eliminará el registro.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSocio(socio._id)
      }
    })
  }

  const deleteSocio = (id) => {
    deleteSociosApi(id)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminar Socio',
          text: response
        })
        setReloadSocios(true);
      })
  }


  return (
    <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
          <Constrols.Input
            className={classes.searchInput}
            label="Buscar Socio"
            size="small"
            placeholder="Introduzca Cedula de Identidad"
            InputProps={{
              startAdornment: (<InputAdornment>
                <Search />
              </InputAdornment>)
            }}
            onChange={handleSearch}

        />
          </div>
          <Box className="card-header--actions">
            <Tooltip arrow title="Socio">
              <Link to="/Socios/new">
                <Button startIcon={<AddIcon />} size="small" variant="contained" color="primary" >
                  Nuevo
                </Button>
              </Link>
            </Tooltip>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover text-nowrap mb-0">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: '40%' }}>Socio Minero</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  empresasAfterPagingAndsorting().map((socio) => (
                    <tr key={socio._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Avatar alt="..." src={avatar2} className="mr-2" />
                          <div>
                            <a
                              href="#/"
                              onClick={e => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="...">
                              {`${socio.nombre_Soc} ${socio.apellidos_Soc}`}
                            </a>
                            <span className="text-black-50 d-block">
                              {`Sección ${socio.bocamina.nombre_Boc} `}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="h-auto py-0 px-3 badge badge-warning">
                          Pending
                        </div>
                      </td>
                      <td className="text-center">
                        <Box>
                          <Tooltip arrow title="Editar">
                            <Link to={`/Socios/${socio._id}/editar`}>
                              <IconButton className={classes.boton} color="primary" size="small">
                                <FontAwesomeIcon icon={['fas', 'user-edit']} />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip arrow title="Eliminar">
                            <IconButton 
                              color="secondary" 
                              size="small"
                              onClick={() => handleDeleteSocio(socio)}
                            >
                              <FontAwesomeIcon icon={['fas', 'trash-alt']} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <Divider />
            <TblPagination />
          </div>
        </CardContent>
      </Card>
  );
};

export default ListSocios;


