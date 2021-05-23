import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cooperativasReducer } from './reducers'

export default createStore(
  combineReducers(
    {
      cooperativasReducer
    }
  ),
  composeWithDevTools(applyMiddleware(thunk))
)
