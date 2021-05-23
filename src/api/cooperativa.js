import { basePath } from './config';

export function createCooperativaApi(data) {
  const url = `${basePath}/cooperativas`;

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

  export function getCooperativaApi() {
    const url = `${basePath}/cooperativas`;
  
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

  export function getCooperativaByIdApi(id) {
    const url = `${basePath}/cooperativas/${id}`;
  
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

  export function updateCooperativaApi(id, data) {
    const url = `${basePath}/cooperativas/${id}`;
  
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

  export function deleteCooperativaApi(id) {
    const url = `${basePath}/cooperativas/${id}`;
  
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
