// External Dependecies
import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

// Our Dependencies
import ImageInput from './index';

describe('ImageInput', () => {
  let url, wrapper;

  beforeEach(() => {
    url = faker.image.imageUrl();

    wrapper = shallow(
    <ImageInput
      className={faker.lorem.word()}
      name={faker.lorem.word()}
      maxHeight={faker.random.number()}
      url={url}
    />
    )
  });

  it('should intialize state.value to correct url', () => {
    expect(wrapper.state().value).toEqual(url);
  });

  describe('when a user removes the file', () => {
    beforeEach(() => {
      const input = wrapper.find('input[type="file"]');
      input.simulate('change', {
        target: { 
          files: [undefined],
        }
      });
    });

    it('should reset the state.value to an empty string', () => {
      expect(wrapper.state().value).toEqual('')
    });
  });
});
