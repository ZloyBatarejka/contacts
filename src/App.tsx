import React, { useEffect } from "react";
import Form from "./components/Form";
import Contact from "./components/Contact";
import { useSelector, useDispatch } from "react-redux";
import { IAppReducer, IContact } from "./interfaces";
import Auth from "./components/Auth";
import { login, logout, setContacts } from "./redux/actions";
const App: React.FC = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state: IAppReducer) => state.auth.token);
  const searching = useSelector((state: IAppReducer) => state.search.searching);
  const searchResult = useSelector(
    (state: IAppReducer) => state.search.searchResult
  );
  const contacts = useSelector(
    (state: IAppReducer) => state.contacts.contacts
  ).sort((a: IContact, b: IContact) => {
    return a.name > b.name ? 1 : -1;
  });
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts") || "[]");
    dispatch(setContacts(saved));
    const token = localStorage.getItem("token") || null;
    if (token) {
      dispatch(login(token));
    }
  }, []);
  const logouthandler = (): void => {
    dispatch(logout());
  };
  return (
    <>
      {logged ? (
        <>
          <div className="container">
            <Form />
            <ul className="contacts">
              {searching
                ? searchResult.length
                  ? searchResult.map((item: IContact) => (
                      <Contact contact={item} key={item.id} />
                    ))
                  : "Нет совпадений"
                : contacts.length
                ? contacts.map((item: IContact) => (
                    <Contact contact={item} key={item.id} />
                  ))
                : "Список пуст"}
            </ul>
          </div>
          <button className="btn btn-primary btnLogout" onClick={logouthandler}>
            Выйти
          </button>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
