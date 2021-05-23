import { basePath } from './config';

export function getEmpresaApi() {
  const url = `${basePath}/api/empresa/list`;

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

export function createempresaApi(data) {
  const url = `${basePath}/api/empresa/add`;

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

export function getEmpresaByIdApi(id) {
  const url = `${basePath}/api/empresa/query/${id}`;

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

export function updateEmpresaApi(id, data) {
  const url = `${basePath}/api/empresa/update/${id}`;

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

export function deleteEmpresaApi(id) {
  const url = `${basePath}/api/empresa/remove/${id}`;

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
