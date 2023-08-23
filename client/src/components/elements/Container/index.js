// import React from 'react';
// import Card from '../Card';

// const index = ({children, className}) => {
//   return (
//     <Card
//       className={`mx-auto my-10 w-4/5 ${className}`}
//     >
//       {children}
//     </Card>
//   )
// }

// export default index

import React, { Component, useState } from 'react';
import { Modal } from '../Modal';
import TriggerButton from '../TriggerButton';
import { auth } from '../../../firebase-config';

import { Link } from "react-router-dom";
import { useAuthState } from '../../UserAuthContext';

export class Container extends Component {
  state = {
    isShown: false,
    auth_info: useAuthState()
  };



  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };

  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  render() {
    return (
      <React.Fragment>
        {/* <TriggerButton
          showModal={this.showModal}
          buttonRef={(n) => (this.TriggerButton = n)}
          triggerText={this.props.triggerText}
        /> */}
        <Link className='navbar-link' onClick={this.showModal}>Edit Profile</Link>
        {this.state.isShown ? (
          <Modal
            onSubmit={this.props.onSubmit}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Container;
