import React, { Fragment, useState } from 'react';
import {
  IconButton,
  Card,
  CardContent,
  Button,
  Tooltip,
  makeStyles,
  TablePagination,
  Divider,
  InputAdornment
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
//import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { deleteCooperativaApi } from '../../../../api/cooperativa';
import Swal from 'sweetalert2';
import Controls from '../../../../example-components/controls/Controls';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  iconEdit: {
    color:'#28a745'
  },
  iconDelete:{
    color:'#dc3545'
  },
  searchInput :{
    width: '75%'
  },
 
}));

const ListCooperativas = (props) => {

  const {cooperativas, setReloadCooperativa } = props;
  const classes = useStyles();

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
    count={cooperativas.length}
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
          return items.filter(x => x.nombre_Coop.toLowerCase().includes(target.value));
        }
      }
    })
  }

  const cooperativasAfterPagingAndsorting = () => {
    return filterFn.fn(cooperativas).slice(page*rowsPerPage, (page+1)*rowsPerPage);
  }

  const handleDeleteCooperativa = cooperativa => {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Una cooperativa no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCooperativa(cooperativa._id)
      }
    })
  }

  const deleteCooperativa = (id) => {
    deleteCooperativaApi(id)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminar cooperativa',
          text: response
        })
        setReloadCooperativa(true);
      })
  }


  return (
    <Fragment>
      <Card elevation={3} className="card-box mb-4">
        <div className="card-header pr-2">
          <div className="card-header--title">
          <Controls.Input 
            className={classes.searchInput}
            label="Buscar Cooperativa"
            size="small"
            InputProps={{
              startAdornment: (<InputAdornment>
                <Search />
              </InputAdornment>)
            }}
            onChange={handleSearch}

        />
          </div>
          <div className="card-header--actions">
            <Tooltip arrow title="Nueva Cooperativa">
              <Link to="/Cooperativas/new">
                <Button  startIcon={<AddIcon />} variant="contained" color="primary" size="small">Agregar</Button>
              </Link>
            </Tooltip>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="table-responsive">
            <table className="table table-borderless table-hover text-nowrap mb-0">
              <thead>
                <tr>
                  <th className="text-left">Nombre Cooperativa</th>
                  <th className="text-center">Telefono</th>
                  <th className="text-center">Tipo de Sociedad</th>
                  <th className="text-center">Editar</th>
                  <th className="text-center">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  cooperativasAfterPagingAndsorting().map((cooperativa, index) => (
                  <tr key={cooperativa._id}>
                  
                  <td>
                    <div>
                      <a
                        href="#/"
                        onClick={e => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        {cooperativa.nombre_Coop}
                      </a>
                      <span className="text-black-50 d-block">
                        {cooperativa.direccion_Coop}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    {cooperativa.telefono_Coop}
                  </td>
                  <td className="text-center">
                    {cooperativa.razonSocial_Coop}
                  </td>
                  <td className="text-center">
                    <Tooltip arrow title="Editar">
                      <Link to={`/Cooperativas/${cooperativa._id}/editar`}>
                        <IconButton
                          size="small"
                          variant="outlined"
                        >
                          <EditIcon className={classes.iconEdit} />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </td>
                  <td className="text-center">
                    <Tooltip arrow title="Eliminar">
                      <IconButton
                        size="small"
                        variant="outlined"
                        onClick={() => handleDeleteCooperativa(cooperativa)}
                        >
                        <DeleteIcon className={classes.iconDelete} />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
                ))
                }
              </tbody>
            </table>
            <Divider />
            <TblPagination/>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}


export default ListCooperativas;
