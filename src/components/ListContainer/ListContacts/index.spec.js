// External Dependecies
import React from 'react';
import { shallow } from 'enzyme';

// Our Dependencies
import { getContactList } from '../../../util/testData'
import ListContacts from './index';

describe('ListContacts', () => {
  let wrapper;

  // Generate Prop Data
  const numOfContacts = 4;
  const contacts = getContactList(numOfContacts);

  // Mocks
  const onDeleteContact = jest.fn();
  const onContactClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ListContacts
        filteredContacts={contacts}
        onDeleteContact={onDeleteContact}
        onContactClick={onContactClick}
      />
    )
  });

  afterEach(() => {
    onDeleteContact.mockClear();
    onContactClick.mockClear();
  });

  it(`should have a contact list length of ${numOfContacts}`, () => {
    expect(wrapper.find('.contact-list-item').length).toEqual(numOfContacts);
  });

  describe('Clicking on a contact detail', () => {
    beforeEach(() => {
      const contactDetails = wrapper.find('.contact-details').first();
      contactDetails.simulate('click');
    });

    it('should call the onContactClick once', () => {
      expect(onContactClick.mock.calls.length).toBe(1);
    });

    it('should pass the correct data to the onContactClick', () => {
      expect(onContactClick.mock.calls[0][0]).toBe(contacts[0]);
    });
  });

  describe('Clicking on the remove button', () => {
    beforeEach(() => {
      const contactDetails = wrapper.find('.contact-remove').first();
      contactDetails.simulate('click');
    });

    it('should call the onDeleteContact once', () => {
      expect(onDeleteContact.mock.calls.length).toBe(1);
    });

    it('should pass the correct data to the onContactClick', () => {
      expect(onDeleteContact.mock.calls[0][0]).toBe(contacts[0]);
    });
  });

});


