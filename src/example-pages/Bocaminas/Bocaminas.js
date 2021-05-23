import React, { useEffect, useState } from 'react';
import PageHeader from '../../example-components/PageHeader';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ListBocaminas from 'example-components/Admin/Bocaminas/ListBocaminas';
import {getBocaminasApi} from '../../api/bocamina';

const Bocaminas = () => {

  const [bocaminas, setBocaminas] = useState([]);
  const [reloadBocaminas, setReloadBocaminas] = useState(false);
  console.log(bocaminas);

  useEffect(() => {
    getBocaminasApi().then(response => {
      setBocaminas(response.bocaminas)
    })
    setReloadBocaminas(false)
  }, [reloadBocaminas]);
  return (
    <>
      <PageHeader
        title="Bocaminas"
        subTitle="Bienvenido a la secion de Bocaminas, aqui podra crear, listar, editar y eliminar las bocaminas registradas."
        icon={<HomeWorkIcon  fontSize="large" />}
      />
      <ListBocaminas 
        bocaminas={bocaminas}
        setReloadBocaminas={setReloadBocaminas}
      />
    </>
  );
};

export default Bocaminas;
