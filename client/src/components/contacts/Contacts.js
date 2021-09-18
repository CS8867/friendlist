import React, { useContext, Fragment, useEffect } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  useEffect(() => {
    contactContext.getContacts();
    // eslint-disable-next-line
  }, []);

  if (
    contactContext.contacts !== null &&
    contactContext.contacts.length === 0 &&
    !contactContext.loading
  ) {
    // Note that in JS, the && operator works as follows: The second condition is checked only if the first condition is true.
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {console.log(contactContext.contacts)}
      {contactContext.contacts != null && !contactContext.loading ? (
        <div>
          {contactContext.filtered !== null
            ? contactContext.filtered.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contactContext.contacts.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
