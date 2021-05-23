import React, {useEffect, useState} from 'react';
import PageHeader from '../../example-components/PageHeader';
import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import { getConductorApi } from '../../api/conductor'
import ListConductores from 'example-components/Admin/Conductores/ListConductores';

const Conductores = () => {

  const [conductores, setConductores] = useState([]);
  const [reloadConductores, setReloadConductores] = useState(false);
  console.log(conductores)

  useEffect(() => {
    getConductorApi().then(response => {
      setConductores(response.listConductores)
    })
    setReloadConductores(false)
  }, [reloadConductores]);

  return (
    <>
      <PageHeader
        title="Conductores"
        subTitle="Bienvenido a la sección de conductores, aqui podra crear, listar, editar y eliminar los conductores registrados."
        icon={<SupervisedUserCircleTwoToneIcon  fontSize="large" />}
      />
      <ListConductores
        conductores={conductores}
        setReloadConductores={setReloadConductores}
      />
    </>
  );
};

export default Conductores;
