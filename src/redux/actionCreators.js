import { basePath } from '../api/config';
import { GET_ALL_COOPERATIVAS } from './actions'


export const getAllCooperativas = ()  => dispatch => {
  const url = `${basePath}/cooperativas`;
  
  return fetch(url)
  .then(response => {
    return response.json()
  })
  .then(result => {
    return dispatch({
      type: GET_ALL_COOPERATIVAS,
      cooperativas: result.listaCoop 
    })
  })
  .catch(err => {
    return err.message
  })
}
