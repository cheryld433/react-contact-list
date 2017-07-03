// External Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Our Dependencies
import ListContainer from './ListContainer';
import ContactForm from './ContactForm';
import * as ContactsAPI from '../services/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(newContact => {
      this.setState(state => ({
        contacts: state.contacts.concat(newContact)
      }));
    });
  };

  editContact(contact) {      
    this.setState(({ contacts }) => ({
      contacts: contacts.map(c => (
        c.id === contact.id ? contact : c
      ))
    }));
    ContactsAPI.update(contact);
  }

  deleteContact = (contact) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(c => c.id !== contact.id)
    }));
    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={({ history }) => (
          <ListContainer
            contacts={this.state.contacts}
            onDeleteContact={this.deleteContact}
            onContactClick={(contact) => {
              history.push('/edit', {
                contact
              });
            }}
          />
        )} />

        <Route path='/create' render={({ history }) => (
          <ContactForm
            headerText='Create'
            buttonText='Create'
            onCreateContact={contact => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />

        <Route path='/edit' render={({ history }) => (
          <ContactForm
            headerText='Edit'
            buttonText='Save'
            contact={history.location.state.contact}
            onEditContact={contact => {
              this.editContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App;