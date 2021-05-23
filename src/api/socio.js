import { basePath } from './config';

export function createSociosApi(data) {
  const url = `${basePath}/socios`;

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

  export function getSociosApi() {
    const url = `${basePath}/socios`;
  
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
  export function getSocioByIdApi(id) {
    const url = `${basePath}/socios/${id}`;
  
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

  export function updateSocioApi(id, data) {
    const url = `${basePath}/socios/${id}`;
  
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

  export function deleteSociosApi(id) {
    const url = `${basePath}/socios/${id}`;
  
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
