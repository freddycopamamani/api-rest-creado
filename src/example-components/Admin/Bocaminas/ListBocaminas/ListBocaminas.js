import React, {useState} from 'react';
import {makeStyles, InputAdornment, TablePagination, Card, Button, Tooltip, Divider} from '@material-ui/core';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import {deleteBocaminaApi} from '../../../../api/bocamina';
import Swal from 'sweetalert2';
import Controls from '../../../controls/Controls';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  searchInput :{
    width: '75%'
  }
}))

const ListBocaminas = (props) => {
  const {bocaminas, setReloadBocaminas} = props;
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
    count={bocaminas.length}
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
          return items.filter(x => x.nombre_Boc.toLowerCase().includes(target.value));
        }
      }
    })
  }

  const empresasAfterPagingAndsorting = () => {
    return filterFn.fn(bocaminas).slice(page*rowsPerPage, (page+1)*rowsPerPage);
  }

  
  const handleDeleteBocamina = bocamina => {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Se borrara toda la información",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBocamina(bocamina._id)
      }
    })
  }

  const deleteBocamina = (id) => {
    deleteBocaminaApi(id)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminar bocamina',
          text: response
        })
        setReloadBocaminas(true);
      })
  }

  return (
    <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
          <Controls.Input 
          className={classes.searchInput}
          label="Buscar Bocamina"
          size="small"
          placeholder="Introduzca nombre de bocamina."
          InputProps={{
            startAdornment: (<InputAdornment>
              <Search />
            </InputAdornment>)
          }}
          onChange={handleSearch}

        />
          </div>
          <div className="card-header--actions">
            <Tooltip arrow title="Bocamina">
              <Link to="/Bocaminas/new">
                <Button  startIcon={<AddIcon />} variant="contained" color="primary" size="small">Nuevo</Button>
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className="card-body px-0 pt-2 pb-3">
          <table className="table table-hover table-borderless  text-nowrap p-5 mb-0">
            <thead>
              <tr>
                <th>Nombre Bocamina</th>
                <th className="text-center">Latitud</th>
                <th className="text-center">Longitud</th>
                <th className="text-center">Altura</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                empresasAfterPagingAndsorting().map(bocamina => (
                  <tr key={bocamina._id}>
                    <td >
                      <div className="d-flex">
                        
                        <div >
                          <a
                            href="#/"
                            onClick={e => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="..." >
                            {
                              bocamina.nombre_Boc
                            }
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="text-primary"> {bocamina.lat_Boc} </span>
                    </td>
                    <td className="text-center">
                      <span className="text-primary "> {bocamina.long_Boc} </span>
                    </td>
                    <td className="text-center">
                      <span className="text-primary"> {bocamina.cota_Boc} </span>
                    </td>
                    <td className="text-center">
                      <Tooltip arrow title="Editar">
                        <Link to={`/Bocaminas/${bocamina._id}/editar`}>
                          <Button size="small" startIcon={<EditIcon/>} className="m-2 btn text-success">Editar</Button>
                        </Link>
                      </Tooltip>
                      <Tooltip arrow title="Eliminar">
                          <Button   size="small" startIcon={<DeleteIcon />} className="m-2 btn text-danger" onClick={() => handleDeleteBocamina(bocamina)} >Eliminar</Button>
                      </Tooltip>
                    </td>
              </tr>
                ))
              }
            </tbody>
          </table>
          <Divider />
          <TblPagination />
        </div>
      </Card>
  );
};

export default ListBocaminas;
