import { GET_ALL_COOPERATIVAS } from './actions'

export const cooperativasReducer = (state = {}, action) => {
  if(action.type === GET_ALL_COOPERATIVAS){
    return action.cooperativas
  }
  return state
}

