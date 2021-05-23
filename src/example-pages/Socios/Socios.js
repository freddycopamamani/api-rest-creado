import React, {useState, useEffect} from 'react';
import PageHeader from '../../example-components/PageHeader';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListSocios from 'example-components/Admin/Socios/ListSocios';
import { getSociosApi } from '../../api/socio';


const Socios = () => {

  const [socios, setSocios] = useState([]);
  const [reloadSocios, setReloadSocios] = useState(false);

  console.log(socios);
  

  useEffect(() => {
    getSociosApi().then(response => {
      setSocios(response.socios);
    })
    setReloadSocios(false)
  }, [reloadSocios])

  return (
    <>
      <PageHeader
        title="Socios Cooperativistas"
        subTitle="Bienvenido a la sección de Socios, aqui podra crear, listar, editar y eliminar los socios registradas."
        icon={<SupervisedUserCircleIcon  fontSize="large" />}
      />
      <ListSocios
        socios={socios}
        setReloadSocios={setReloadSocios} 
      />
    </>
  );
};

export default Socios;
