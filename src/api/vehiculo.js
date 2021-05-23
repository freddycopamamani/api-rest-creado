import { basePath } from './config';

export function getVehiculosApi() {
  const url = `${basePath}/api/vehiculo/list`;

  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message
    })
}

export function createVehiculoApi(data) {
  const url = `${basePath}/api/vehiculo/add`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: token
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}

export function getVehiculoByIdApi(id) {
  const url = `${basePath}/api/vehiculo/query/${id}`;

  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message
    })
}

export function updateVehiculoApi(id, data) {
  const url = `${basePath}/api/vehiculo/update/${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      //Authorization: token
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err;
    });
}

export function deleteVehiculoApi(id) {
  const url = `${basePath}/api/vehiculo/remove/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      //Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}
