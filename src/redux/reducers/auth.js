const intialState = {
  token: null,
  user: null,
  authMessage: null,
  errorMessage: null,
  alertType: 'warning',
  loading: false,
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        token: action.payload,
        user: action.user,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        errMessage: action.payload.message,
        alertType: action.payload.type,
      };
    case 'SET_AUTH_MESSAGE':
      return {
        ...state,
        authMessage: action.payload.message,
        type: action.payload.type,
      };
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        authMessage: null,
        errMessage: null,
        alertType: 'warning',
      };
    case 'SET_ID':
      return {
        ...state,
        user: {
          id: action.payload.id,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: !state.loading,
      };
    case 'SIGNOUT':
      return {
        ...state,
        token: null,
        user: null,
        authMessage: '',
      };
    default:
      return state;
  }
};

export default authReducer;
