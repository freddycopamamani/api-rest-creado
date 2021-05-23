import { basePath } from './config';

export function getConductorApi() {
  const url = `${basePath}/api/conductor/list`;

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

export function createConductorApi(data) {
  const url = `${basePath}/api/conductor/add`;

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

export function getConductorByIdApi(id) {
  const url = `${basePath}/api/conductor/query/${id}`;

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

export function updateConductorApi(id, data) {
  const url = `${basePath}/api/conductor/update/${id}`;

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

export function deleteConductorApi(id) {
  const url = `${basePath}/api/conductor/remove/${id}`;

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
