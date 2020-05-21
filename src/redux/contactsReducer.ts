import { ADD_CONTACT, SET_CONTACTS } from './types';
import { IInitialContactsState, IContactsAction } from '../interfaces';
const initialState: IInitialContactsState = {
  contacts: [{ id: 1, name: 'Ruslan', icq: 5454545 }],
};
export default (state = initialState, action: IContactsAction) => {
  switch (action.type) {
    case ADD_CONTACT:
      return { ...state, contacts: [action.payload, ...state.contacts] };
    case SET_CONTACTS:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};
