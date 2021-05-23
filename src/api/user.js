import { basePath } from "./config";

export function signInApi(data) {
  const url = `${basePath}/auth/signin`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }
  //console.log(data);
  return fetch(url, params)
  .then(response => {
    return response.json();
  })
  .then(result => {
    
    return result;
    
  })
  .catch(err => {
    return err.message
  })
}


export function getUsersApi() {
  const url = `${basePath}/users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: token
    }
  };

  return fetch(url, params)
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

export function getUserByIdApi(id) {
  const url = `${basePath}/users/${id}`;

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

export function getUsersActiveApi(status) {
  const url = `${basePath}/users/active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: token
    }
  };

  return fetch(url, params)
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

export function updateUserApi(id, data) {
  const url = `${basePath}/users/update/${id}`;

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

export function crearUserAdminApi(data){
  const url = `${basePath}/users`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: token
    },
    body: JSON.stringify(data)
  }

  return fetch(url, params)
    .then(response => {
      return response.json()
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    })
}

export function activateUserApi(userId, status) {
  const url = `${basePath}/users/activate/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      //Authorization: token
    },
    body: JSON.stringify({
      active: status
    })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function deleteUserApi(userId) {
  const url = `${basePath}/users/delete/${userId}`;

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
      return err.message;
    });
}

export function uploadAvatarApi(avatar, userId){
  const url = `${basePath}/users/upload-avatar/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      //"Content-Type": "application/json",
      //Authorization: token
    }
  }

  return fetch(url, params)
    .then(response => {
      return response.json()
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    })
}


export function getAvatarApi(avatarName) {
  const url = `${basePath}/users/get-avatar/${avatarName}`;

  return fetch(url)
    .then( response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}
