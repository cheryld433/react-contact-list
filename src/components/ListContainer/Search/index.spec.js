// External Dependecies
import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';

// Our Dependencies
import { getContactList } from '../../../util/testData'
import Search from './index';

describe('Search', () => {
  let wrapper;

  // Generate Prop data
  const numOfContacts = 4;
  const contacts = getContactList(numOfContacts);

  // Mocks
  const onUpdateQuery = jest.fn();
  const onClearQuery = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Search
        query={''}
        contacts={contacts}
        filteredContacts={contacts}
        onUpdateQuery={onUpdateQuery}
        onClearQuery={onClearQuery}
      />
    )
  });

  afterEach(() => {
    onUpdateQuery.mockClear();
    onClearQuery.mockClear();
  });

  it('should not make visible .showing-contacts', () => {
    expect(wrapper.find('.showing-contacts').length).toEqual(0);
  });

  describe('Enter text in search field', () => {  
    const value = faker.lorem.word();

    beforeEach(() => {
      wrapper = shallow(
        <Search
          query={value}
          contacts={contacts}
          filteredContacts={[]}
          onUpdateQuery={onUpdateQuery}
          onClearQuery={onClearQuery}
        />
      )
    });

    it('should not make visible .showing-contacts', () => {
      expect(wrapper.find('.showing-contacts').length).toEqual(1);
    });

    describe('onClearQuery', () => {
      beforeEach(() => {
        const button = wrapper.find('.showing-contacts button').first();
        button.simulate('click');
      });

      it('should call once', () => {
        expect(onClearQuery.mock.calls.length).toEqual(1);
      });
    });

    describe('onUpdateQuery', () => {
      beforeEach(() => {
        const search = wrapper.find('.search-contacts').first();
        search.simulate('change', {
          target: { value }
        });
      });

      it('should call once', () => {
        expect(onUpdateQuery.mock.calls.length).toEqual(1);
      });
      
      it('should pass the correct data', () => {
        expect(onUpdateQuery.mock.calls[0][0]).toEqual(value);
      });
    });
  });
});


