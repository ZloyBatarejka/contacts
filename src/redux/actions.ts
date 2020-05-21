import {
  ADD_CONTACT,
  SEARCH,
  SET_SEARCH_RESULT,
  SET_CONTACTS,
  LOGIN,
  LOGOUT,
} from "./types";
import {
  IContact,
  IContactsAction,
  ISearchAction,
  IAuthAction,
  IInitialAuthState,
} from "../interfaces";
import { ThunkDispatch } from "redux-thunk";
import axios from "axios";

export const addContact = (contact: IContact): IContactsAction => {
  return {
    type: ADD_CONTACT,
    payload: contact,
  };
};
export const patchContacts = (contacts: IContact[]): IContactsAction => {
  return {
    type: SET_CONTACTS,
    payload: contacts,
  };
};
export const setSearchStatus = (status: boolean): ISearchAction => {
  return {
    type: SEARCH,
    payload: status,
  };
};

export const setSearchResult = (arr: IContact[]): ISearchAction => {
  return {
    type: SET_SEARCH_RESULT,
    payload: arr,
  };
};

export const setContacts = (arr: IContact[]): IContactsAction => {
  return {
    type: SET_CONTACTS,
    payload: arr,
  };
};

export const login = (token: string): IAuthAction => {
  console.log("lol");
  return {
    type: LOGIN,
    payload: token,
  };
};
export const logout = (): IAuthAction => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};
export const auth = (email: string, password: string, isLogin: boolean) => {
  return async (
    dispatch: ThunkDispatch<IInitialAuthState, undefined, IAuthAction>
  ) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCbEy9xW2_4hhymT-IiRNsQSxlipzLuq7Q";
    if (isLogin) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCbEy9xW2_4hhymT-IiRNsQSxlipzLuq7Q";
    }
    const response = await axios.post(url, authData);
    const data = response.data;
    const token = data.localId;
    localStorage.setItem("token", token);
    dispatch(login(token));
  };
};
