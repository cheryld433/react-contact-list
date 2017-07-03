// External Dependecies
import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';

// Our Dependencies
import { getContact } from '../../util/testData'
import ContactForm from './index';

describe('ContactForm', () => {
  let wrapper;

  // Generate Prop data
  const props = {
    headerText: faker.helpers.randomize(['Create', 'Edit']),
    buttonText: faker.helpers.randomize(['Create', 'Save']),
    contact: getContact(),
    onCreateContact: jest.fn(),
    onEditContact: jest.fn(),
  };
  
  beforeEach(() => {
    wrapper = shallow(
      <ContactForm
        headerText={props.headerText}
        buttonText={props.buttonText}
        contact={props.contact}
        onCreateContact={props.onCreateContact}
        onEditContact={props.onEditContact}
      />
    )
  });

  afterEach(() => {
    props.onCreateContact.mockClear();
    props.onEditContact.mockClear();
  });

  it('should render the correct header text', () => {
    const header = wrapper.find('.top-container-text').first();
    expect(header.text()).toEqual(`${props.headerText} Contact`);
  });

  it('should render the correct button text', () => {
    const button = wrapper.find('.button--primary').first();
    expect(button.text()).toEqual(`${props.buttonText} Contact`);
  });

  describe('when a user submits a form in creation mode', () => {
    let form, onCreateContact, onEditContact;

    beforeEach(() => {
      onCreateContact = props.onCreateContact;
      onEditContact = props.onEditContact

      form = wrapper.find('form').first();
      form.simulate('submit', {
        preventDefault: () => {},
        target: {},
      });
    });
    
    it('should call the onCreateContact function once', () => {
      expect(onCreateContact.mock.calls.length).toEqual(1);
    });

    it('should not call the onEditContact function', () => {
      expect(onEditContact.mock.calls.length).toEqual(0);
    });

    describe('when the user submit a form edit mode', () => {
      const { contact } = props;

      beforeEach(() => {
        wrapper = shallow(
          <ContactForm
            headerText={props.headerText}
            buttonText={props.buttonText}
            contact={props.contact}
            onCreateContact={undefined}
            onEditContact={props.onEditContact}
          />
        )

        form = wrapper.find('form').first();
        form.simulate('submit', {
          preventDefault: () => {},
          target: {},
        });
      });

      it('should call the onEditContact function once', () => {
        expect(onEditContact.mock.calls.length).toEqual(1);
      });

      it('should recieve the correct contact id', () => {
        expect(onEditContact.mock.calls[0][0].id).toEqual(contact.id);
      });

      it('should not be called a second time', () => {
        expect(onCreateContact.mock.calls.length).toEqual(1);
      });
    });

  });
});


