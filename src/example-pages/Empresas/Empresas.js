import React, {useState, useEffect} from 'react';
import PageHeader from '../../example-components/PageHeader';
import HouseIcon from '@material-ui/icons/House';
import { getEmpresaApi } from '../../api/empresa'
import ListEmpresas from '../../example-components/Admin/Empresas/ListEmpresas';

const Empresas = () => {

  const [empresas, setEmpresas] = useState([]);
  const [reloadEmpresas, setReloadEmpresas] = useState(false);
  
  console.log(empresas)

  useEffect(() => {
    getEmpresaApi().then(response => {
      setEmpresas(response.listEmpresas)
    })
    setReloadEmpresas(false)
  }, [reloadEmpresas]);


  return (
    <>
      <PageHeader
        title="Empresas Mineras"
        subTitle="Bienvenido a la sección de las Empresas mineras, aqui podra crear, listar, editar y eliminar las empresas registradas."
        icon={<HouseIcon  fontSize="large" />}
      />
      <ListEmpresas
        empresas={empresas}
        setReloadEmpresas={setReloadEmpresas} 
      />
    </>
  );
};

export default Empresas;
