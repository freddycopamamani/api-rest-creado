import React, { useState } from 'react';
import { Button, Tooltip, Table, TableBody, Paper, Divider, TableRow, TableCell, makeStyles, IconButton, TablePagination, Toolbar, InputAdornment } from '@material-ui/core';
//import useTable from '../../../useTable/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Constrols from '../../../../example-components/controls/Controls';
import { Search } from '@material-ui/icons';
import Swal from 'sweetalert2';
import { deleteEmpresaApi } from '../../../../api/empresa';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import {ExampleWrapperSeamless } from '../../../../layout-components'

const useStyles = makeStyles(theme => ({
  table:{
    
    border:'1px solid #0000001F',
    '& .MuiTableCell-head': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: '#f0f8ff'
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover' : {
      backgroundColor: "#fffbf2",
      cursor: 'pointer'
    },
  },
  searchInput :{
    width: '75%'
  },
  newButton : {
    marginLeft: theme.spacing(10),
    right:'10px',
  },
  paper:{
    padding:'20px',
    borderTop: '5px solid #1c3c50'
  }
}))

const ListEmpresas = (props) => {
  const classes = useStyles()
  const {empresas, setReloadEmpresas} = props;

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
    count={empresas.length}
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
          return items.filter(x => x.nombreComercial_Emp.toLowerCase().includes(target.value));
        }
      }
    })
  }

  const empresasAfterPagingAndsorting = () => {
    return filterFn.fn(empresas).slice(page*rowsPerPage, (page+1)*rowsPerPage);
  }

  const handleDeleteEmpresa = idEmpresa => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "La empresa  no podrá hacer ningun movimiento.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmpresa(idEmpresa)
      }
    })
  }

  const deleteEmpresa = (id) => {
    deleteEmpresaApi(id)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminar Empresa!',
          text: response
        })
        setReloadEmpresas(true);
      })
  }

  
  return (
    <>
    <ExampleWrapperSeamless sectionHeading="Lista de empresas" />
    <Paper className={classes.paper}>
      <Toolbar>
        <Constrols.Input 
          className={classes.searchInput}
          label="Buscar Empresa"
          size="small"
          InputProps={{
            startAdornment: (<InputAdornment>
              <Search />
            </InputAdornment>)
          }}
          onChange={handleSearch}

        />
        <Tooltip arrow title="Bocamina">
          <Link to="/Empresas/new">
            <Button  
              startIcon={<AddIcon />}
              className={classes.newButton}
              variant="contained" 
              color="primary" 
              size="small"
            >
              Nuevo
            </Button>
          </Link>
        </Tooltip>
      </Toolbar>
      <Divider style={{marginLeft:'-20px', marginRight:'-20px'}} />
      <br />
      <Table className={classes.table}>
        <TableRow>
          <TableCell variant="head" >Nombre Empresa</TableCell>
          <TableCell align="center" variant="head">Nro. de Matricula</TableCell>
          
          <TableCell align="center" variant="head">Acciones</TableCell>
        </TableRow>
        <TableBody>
          {
            empresasAfterPagingAndsorting().map((empresa) => 
              (
                <TableRow key={empresa._id}>
                  <TableCell > {empresa.nombreComercial_Emp} </TableCell>
                  <TableCell align="center"> {empresa.nroMatricula_Emp} </TableCell>
                  
                  <TableCell align="center">
                    <Tooltip arrow title="Editar">
                      <Link to={`/Empresas/${empresa._id}/editar`}>
                        <IconButton className="btn text-success" size="small">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip arrow title="Eliminar">
                      <IconButton style={{marginLeft:'20px'}} className="  btn text-danger" size="small" onClick={() => handleDeleteEmpresa(empresa._id)}>
                        <DeleteSweepIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
      <TblPagination />
    </Paper>
    </>
  );
};

export default ListEmpresas;
