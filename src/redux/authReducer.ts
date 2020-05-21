import { LOGIN, LOGOUT } from './types';
import { IInitialAuthState, IAuthAction } from '../interfaces';
const initialState: IInitialAuthState = {
  token: null,
};
export default (state = initialState, action: IAuthAction) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.payload };
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
};
