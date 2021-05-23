import React, {useState, useEffect} from 'react';
import PageHeader from '../../example-components/PageHeader';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import ListVehiculos from 'example-components/Admin/Vehiculos/ListVehiculos';
import { getVehiculosApi } from '../../api/vehiculo';

const Vehiculos = () => {

  const [vehiculos, setVehiculos] = useState([]);
  const [reloadVehiculos, setReloadVehiculos] = useState(false);
  console.log(vehiculos);
      
  useEffect(() => {
    getVehiculosApi().then(response => {
      setVehiculos(response.listVehiculo)
    })
    setReloadVehiculos(false)
  }, [reloadVehiculos]);

  return (
    <>
      <PageHeader 
        title="Vehiculos"
        subTitle="Bienvenido a la secion de Vehiculos, aqui podra crear, listar, editar y eliminar los Vehiculos registrados."
        icon={<AirportShuttleIcon  fontSize="large" />}
      />
      <ListVehiculos
        vehiculos={vehiculos}
        setReloadVehiculos={setReloadVehiculos}
      />
    </>
  );
};

export default Vehiculos;
