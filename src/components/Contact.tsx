import React, { useState } from "react";
import { IContactProps, IChanger, IAppReducer } from "../interfaces";
import { patchContacts } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Contact: React.FC<IContactProps> = ({ contact }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(contact.name);
  const [icq, setIcq] = useState<number>(contact.icq);
  const [changingNameStatus, setChangingNameStatus] = useState<boolean>(false);
  const [changingIcqStatus, setChanginqIcqStatus] = useState<boolean>(false);
  const contacts = useSelector((state: IAppReducer) => state.contacts.contacts);
  const nameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };
  const setIcqHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIcq(Number(event.target.value));
  };
  const changeStarter: IChanger = {
    icq: function (): void {
      setChanginqIcqStatus(!changingIcqStatus);
    },
    name: function (): void {
      setChangingNameStatus(!changingNameStatus);
    },
  };
  const saveChangeHandler = (): void => {
    const pathcedContacts = contacts.map((item) => {
      if (item.id === contact.id) {
        item.icq = icq;
        item.name = name;
      }
      return item;
    });
    dispatch(patchContacts(pathcedContacts));
    setChangingNameStatus(false);
    setChanginqIcqStatus(false);
  };
  const startChangingHandler = (type: string): void => {
    changeStarter[`${type}`]();
  };
  const deleteHandler = (): void => {
    const pathcedContacts = contacts.filter((item) => item.id !== contact.id);
    dispatch(patchContacts(pathcedContacts));
  };
  return (
    <li className="contact">
      <span className="contact__body">
        {changingNameStatus ? (
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={nameChangeHandler}
          />
        ) : (
          <div
            onClick={(): void => {
              startChangingHandler("name");
            }}
          >
            {name}
          </div>
        )}
        {changingIcqStatus ? (
          <input
            type="text"
            className="form-control"
            value={icq}
            onChange={setIcqHandler}
          />
        ) : (
          <div
            onClick={(): void => {
              startChangingHandler("icq");
            }}
          >
            {icq}
          </div>
        )}
      </span>
      <span className="contact__controls">
        {changingNameStatus || changingIcqStatus ? (
          <i className="far fa-save" onClick={saveChangeHandler}></i>
        ) : null}
        <i className="fas fa-trash-alt" onClick={deleteHandler}></i>
      </span>
    </li>
  );
};

export default Contact;
