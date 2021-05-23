import { basePath } from './config';

export function getBocaminasApi() {
  const url = `${basePath}/bocaminas`;

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

export function createBocaminaApi(data) {
  const url = `${basePath}/bocaminas`;

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

export function getBocaminaByIdApi(id) {
  const url = `${basePath}/bocaminas/${id}`;

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

export function updateBocaminaApi(id, data) {
  const url = `${basePath}/bocaminas/${id}`;

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

export function deleteBocaminaApi(id) {
  const url = `${basePath}/bocaminas/${id}`;

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
