// External Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import serializeFrom from 'form-serialize';

// Our Dependencies
import ImageInput from '../ImageInput';

class ContactForm extends Component {
  static propTypes = {
    headerText: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    contact: PropTypes.object,
    onCreateContact: PropTypes.func,
    onEditContact: PropTypes.func,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeFrom(e.target, { hash: true });

    const props = this.props;
    props.onCreateContact ?
      props.onCreateContact(values) :
      props.onEditContact({ id: props.contact.id, ...values });
  }

  render() {
    const { headerText, buttonText } = this.props;
    const defaultContact = {
      id: '',
      name: '',
      email: '',
      avatarURL: '',
    };

    const contact = Object.assign({}, defaultContact, this.props.contact);

    return (
      <div>
        <div className='top-container'>
          <div className='top-container-fixed-bar'>
            <Link to='/' className='close-create-contact'> Close </Link>
            <p className='top-container-text'>{ headerText } Contact</p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
            url={contact.avatarURL}
          />
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='Full name' defaultValue={contact.name} required />
            <input type='email' name='email' placeholder='Email Address' defaultValue={contact.email} required />
            <button className='button button--primary'>{ buttonText } Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ContactForm;