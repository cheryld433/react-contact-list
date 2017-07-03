import React, { Component } from 'react';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

class ListContacts extends Component {
  static propTypes = {
    filteredContacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onContactClick: PropTypes.func.isRequired,
  };

  render() {
    const { filteredContacts, onDeleteContact, onContactClick } = this.props;
    filteredContacts.sort(sortBy('name'));

    return (
      <div>
        <ol className='contact-list'>
          {filteredContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }} />
              <div className='contact-details' onClick={() => onContactClick(contact)}>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className='contact-remove' onClick={() => onDeleteContact(contact)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts; 