// External Dependecies
import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

// Our Dependencies
import { getContactList } from '../../util/testData'
import ListContainer from './index';

describe('ListContainer', () => {
  let wrapper;

  // Generate Prop Data
  const numOfContacts = 4;
  const contacts = getContactList(numOfContacts);

  // Mocks
  const onDeleteContact = jest.fn();
  const onContactClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ListContainer
        contacts={contacts}
        onDeleteContact={onDeleteContact}
        onContactClick={onContactClick}
      />
    )
  });

  afterEach(() => {
    onDeleteContact.mockClear();
    onContactClick.mockClear();
  });

  it('should initialize query to an empty string', () => {
    expect(wrapper.state().query).toEqual('');
  });

  describe('when user types in the search field', () => {
    let Search;
    const query = contacts[0].name;

    beforeEach(() => {
      Search = wrapper.find('Search')
      Search.props().onUpdateQuery(query);
    });

    it(`should update current state to: ${query}`, () => {
       expect(wrapper.state().query).toEqual(query);
    });

    describe('when the user clears the search field', () => {
      beforeEach(() => {
        Search.props().onClearQuery();
      });

      it('should set the query state to an empty string', () => {
        expect(wrapper.state().query).toEqual('');
      })
    });
    
  });
});


