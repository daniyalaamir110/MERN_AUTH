// Import the dependencies
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Types 

const types = {
  AUTHENTICATE_REQUEST: "AUTHENTICATE_REQUEST",
  AUTHENTICATE_SUCCESS: "AUTHENTICATE_SUCCESS",
  AUTHENTICATE_FAILURE: "AUTHENTICATE_FAILURE",
}

// Actions

export const authenticateRequest = () => {
  return {
    type: types.LOADING
  }
}

export const authenticateSuccess = user => {
  return {
    type: types.AUTHENTICATE_SUCCESS,
    payload: user
  }
}

export const authenticateFailure = error => {
  return {
    type: types.AUTHENTICATE_FAILURE,
    payload: error
  }
}

// Initial State

const initialState = {
  isAuthenticating: true,
  isAuthenticated: false,
  user: {},
  error: ""
}

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE_REQUEST:
      return {
        isAuthenticating: true,
        isAuthenticated: false,
        user: {},
        error: ""
      }
    case types.AUTHENTICATE_SUCCESS:
    return {
      isAuthenticating: false,
      isAuthenticated: true,
      user: action.payload,
      error: ""
    }
    case types.AUTHENTICATE_FAILURE:
    return {
      isAuthenticating: false,
      isAuthenticated: false,
      user: {},
      error: action.payload
    }
    default:
    return state;
  }
}

// Create the application's central store
const store = createStore(reducer, applyMiddleware(thunk));

// Callback
store.subscribe(() => {
  console.log(store.getState());
});

export default store;
