// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';

// Our Dependencies
import ListContacts from './ListContacts';
import Search from './Search';

class ListContainer extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onContactClick: PropTypes.func.isRequired,
  }

  state = {
    query: '',
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }

  clearQuery = () => {
    this.setState({
      query: '',
    });
  }

  render() {
    const {
      contacts,
      onDeleteContact,
      onContactClick,
    } = this.props;

    const { query } = this.state;
    let filteredContacts = contacts;
    
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      filteredContacts = contacts.filter((c) => match.test(c.name));
    }

    return (
      <div>
        <Search
          query={query}
          onClearQuery={this.clearQuery}
          onUpdateQuery={this.updateQuery}
          contacts={contacts}
          filteredContacts={filteredContacts}
        />
        <ListContacts
          filteredContacts={filteredContacts}
          onDeleteContact={onDeleteContact}
          onContactClick={onContactClick}
        />
      </div>
    )

  }
}

export default ListContainer;