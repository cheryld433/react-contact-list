import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    contacts: PropTypes.array.isRequired,
    filteredContacts: PropTypes.array.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
    onClearQuery: PropTypes.func.isRequired,
  }

  render() {
    const { 
      query, 
      contacts,
      filteredContacts,
      onUpdateQuery, 
      onClearQuery,
    } = this.props;

    // Retrieve the length for later use
    const contactsLength = contacts.length;
    const filteredContactsLength = filteredContacts.length;

    return (
      <div className='top-container'>
        <div className='top-container-fixed-bar'>
          <input
            type='text'
            className='search-contacts'
            placeholder='Search contacts'
            value={query}
            onChange={(e) => onUpdateQuery(e.target.value)}
          />
          <Link to='/create' className='add-contact'> Add Contact </Link>
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/romarioraffington/react-contact-list'>
            <div className='fork-me-ribbon'></div>
          </a>
        </div>
        { filteredContactsLength !== contactsLength && (
          <div className='showing-contacts'>
            <span>
              { filteredContactsLength } of { contactsLength } |
              <button onClick={onClearQuery}>Show all</button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default Search;