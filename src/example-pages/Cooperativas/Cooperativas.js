import React, { useState, useEffect} from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PageHeader from '../../example-components/PageHeader/PageHeader';
import  ListCooperativas  from '../../example-components/Admin/Cooperativas/ListCooperativas';
import {getCooperativaApi} from '../../api/cooperativa'

const Cooperativas = () => {

  const [cooperativas, setCooperativas] = useState([]);
  const [reloadCooperativa, setReloadCooperativa] = useState(false);
  console.log(cooperativas)

  useEffect(() => {
    getCooperativaApi().then(response => {
      setCooperativas(response.listaCoop)
    })
    setReloadCooperativa(false)
  }, [reloadCooperativa])

  return (
    <>
      <PageHeader
        title="Cooperativas"
        subTitle="Bienvenido a la secion de Cooperativas, aqui podra crear, listar, editar y eliminar las cooperativas registradas."
        icon={<AccountBalanceIcon  fontSize="large" />}
      />
      <ListCooperativas cooperativas={cooperativas} setReloadCooperativa={setReloadCooperativa} />
    </>
  );
};

export default Cooperativas;
