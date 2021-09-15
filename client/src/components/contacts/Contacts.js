import React, { useContext, Fragment } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  if (contactContext.contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {contactContext.filtered !== null
          ? contactContext.filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout="500" classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contactContext.contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout="500" classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
