import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  UPDATE_CONTACT,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Ted Johnson",
        email: "tedjohnson@gmail.com",
        phone: "111-111-1112",
        type: "professional",
      },
      {
        id: 2,
        name: "Harry White",
        email: "harrywhite@gmail.com",
        phone: "111-111-1113",
        type: "personal",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    console.log(contact);
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };
  // Delete Contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // Update Contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };

  // Filter Contact
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
