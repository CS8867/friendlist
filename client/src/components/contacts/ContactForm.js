import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  useEffect(() => {
    if (contactContext.current !== null) {
      setContact(contactContext.current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (contactContext.current === null) {
      contactContext.addContact(contact);
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    } else {
      contactContext.updateContact(contact);
    }
  };

  const clearAll = () => {
    contactContext.clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {contactContext.current === null ? "Add Contact" : "Update Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        checked={type === "personal"}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChange}
        checked={type === "professional"}
      />
      Professional{" "}
      <div>
        <input
          type="submit"
          value={
            contactContext.current === null ? "Add Contact" : "Update Contact"
          }
          className="btn btn-primary btn-block"
        />
      </div>
      {contactContext.current && (
        <div>
          {" "}
          <button className="btn btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
