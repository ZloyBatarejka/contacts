import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, setSearchStatus, setSearchResult } from "../redux/actions";
import { IAppReducer } from "../interfaces";

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: IAppReducer) => state.contacts.contacts);
  const [adding, setAdding] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [icq, setIcq] = useState<number>();
  const [search, setSearch] = useState<string>("");
  const searchInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearch(event.target.value);
  };
  const contactsChangeSaver = (): void => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };
  const searchHandler = () => {
    dispatch(setSearchStatus(!!search.length));
    const searched = contacts.filter((item) =>
      item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    dispatch(setSearchResult(searched));
  };
  useEffect(searchHandler, [search]);
  const changeAddingStatusHandler = (): void => {
    setAdding(!adding);
  };
  const nameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const icqInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIcq(Number(event.target.value));
  };
  const checkDisabled = (): void => {
    if (name.length > 0 && String(icq).length > 0) {
      if (icq && !isNaN(icq) && isFinite(icq)) {
        setDisabled(false);
      }
    }
  };
  useEffect((): void => {
    checkDisabled();
  }, [name, icq]);
  useEffect((): void => {
    contactsChangeSaver();
  }, [contacts]);
  const addContactHandler = (event: any): void => {
    event.preventDefault();
    if (name.length && icq) {
      const contact = {
        name,
        icq,
        id: Date.now(),
      };
      dispatch(addContact(contact));
      setName("");
      setIcq(0);
      setDisabled(true);
    }
  };
  return (
    <div className="form">
      {adding ? (
        <div className="overlay">
          <form className="form__add" onSubmit={addContactHandler}>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={nameInputHandler}
              placeholder="name"
            />
            <input
              className="form-control"
              type="number"
              value={icq}
              onChange={icqInputHandler}
              placeholder="icq"
            />
            <span>
              <button
                className="btn btn-primary"
                onClick={addContactHandler}
                disabled={disabled}
              >
                Добавить
              </button>
              <button
                className="btn btn-warning"
                onClick={changeAddingStatusHandler}
              >
                Закрыть
              </button>
            </span>
          </form>
        </div>
      ) : null}
      <div className="input-group mb-3 form__search">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Поиск
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={search}
          onChange={searchInputHandler}
        />
      </div>
      <div className="form__plus">
        <i
          className="fas fa-plus fa-2x"
          onClick={changeAddingStatusHandler}
        ></i>
      </div>
    </div>
  );
};

export default Form;
