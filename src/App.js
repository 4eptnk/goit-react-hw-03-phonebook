import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

import "./styles.css";

uuidv4();

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  submitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  filterChange = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  renderFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filtered = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filtered)
    );
  };

  deleteContact = (contactEl) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactEl
      ),
    }));
  };

  componentDidMount() {
    console.log("App componentDidMount");

    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("App componentDidUpdate");
    if (this.state.contacts !== prevState.contacts) {
      console.log("Contacts field has updated");

      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const {
      submitHandler,
      filterChange,
      renderFilteredContacts,
      deleteContact,
    } = this;
    const filteredContacts = renderFilteredContacts();

    return (
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <ContactForm onSubmit={submitHandler} />

        <h2 className="title">Contacts</h2>
        <Filter filterValue={filter} onFilter={filterChange} />
        <ContactList
          contactList={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}

export default App;
