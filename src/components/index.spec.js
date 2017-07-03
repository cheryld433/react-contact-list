// External Dependecies
import React from 'react';
import { shallow } from 'enzyme';

// Our Dependencies
import App from './index';
import * as ContactsAPI from '../services/ContactsAPI';

describe.only('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('should intialize contacts state to an empty array', () => {
    expect(wrapper.state().contacts).toEqual([]);
  });
});


