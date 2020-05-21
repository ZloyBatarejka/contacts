import {
  ADD_CONTACT,
  SET_CONTACTS,
  SEARCH,
  SET_SEARCH_RESULT,
  LOGIN,
  LOGOUT,
} from "./redux/types";
export interface IAppReducer {
  auth: IInitialAuthState;
  contacts: IInitialContactsState;
  search: IInitialSearchState;
}
export interface IContact {
  id: number;
  name: string;
  icq: number;
}
export interface IInitialContactsState {
  contacts: IContact[];
}
export interface IContactsAction {
  type: typeof ADD_CONTACT | typeof SET_CONTACTS;
  payload: IContact | IContact[];
}
export interface IInitialSearchState {
  searching: boolean;
  searchResult: IContact[];
}
export interface ISearchAction {
  type: typeof SEARCH | typeof SET_SEARCH_RESULT;
  payload: boolean | IContact[];
}
export interface IInitialAuthState {
  token: null | string;
}
export interface IAuthAction {
  type: typeof LOGIN | typeof LOGOUT;
  payload?: string;
}
export interface IContactProps {
  contact: IContact;
}
export interface IChanger {
  [key: string]: any;
}
