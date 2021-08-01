import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ contactList, onDeleteContact }) => {
  return (
    <ul className={styles.list}>
      {contactList.map(({ id, name, number }) => (
        <li key={id} className={styles.item}>
          <p>{name}: </p>
          <p>{number}</p>
          <button
            type="button"
            className={styles.button}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contactList: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
