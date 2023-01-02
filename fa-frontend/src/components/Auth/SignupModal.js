/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  DropdownItem,
  Alert,
} from 'reactstrap';
import * as AuthAPI from '../../utils/AuthAPI';
import './Auth.css';

export default class SignupModal extends Component {
  state = {
    alertMsg: '',
    alertVisible: false,
    modal: false,
    signupData: {
      name: '',
      email: '',
      password: '',
      vpassword: '',
    },
  }

  toggleModal = () => {
    this.setState(prevState => (
      { modal: !prevState.modal }
    ));
  }

  handleInputChange = (newPartialInput) => {
    this.setState(prevState => ({
      ...prevState,
      signupData: {
        ...prevState.signupData,
        ...newPartialInput,
      },
    }));
  }

  // This method is used to hide the alert message
  onDismiss = () => {
    this.setState({ alertVisible: false, alertMsg: '' });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { signupData } = this.state;
    // Update the footballer's data in the server
    AuthAPI.signupUser(signupData)
      .then((data) => {
        if (data.status) {
          this.setState({ alertVisible: true, alertMsg: data.message });
        } else {
          this.setState({ alertVisible: true, alertMsg: 'User is registered successfully.' });
          console.log('User is registered successfully.', data); // eslint-disable-line no-console
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const { signupData } = this.state;
    return (
      <Fragment>
        <DropdownItem id="dropdown-auth-link" onClick={this.toggleModal}>{this.props.buttonLabel}</DropdownItem>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal}>
            Signup
          </ModalHeader>
          <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismiss}>{this.state.alertMsg}</Alert>
          <ModalBody>
            <div className="form-container">
              <form onSubmit={this.handleSubmit}>
                <div className="input-container">
                  <label htmlFor="name">
                    <span>Name</span>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John"
                      autoComplete="given-name"
                      required
                      onChange={e => this.handleInputChange({ name: e.target.value })}
                      value={signupData.name}
                    />
                  </label>
                </div>
                <div className="input-container">
                  <label htmlFor="email">
                    <span>Email</span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="abc@domain.com"
                      autoComplete="email"
                      required
                      onChange={e => this.handleInputChange({ email: e.target.value })}
                      value={signupData.email}
                    />
                  </label>
                </div>
                <div className="input-container">
                  <label htmlFor="password">
                    <span>Password</span>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder=""
                      autoComplete="new-password"
                      required
                      onChange={e => this.handleInputChange({ password: e.target.value })}
                      value={signupData.password}
                    />
                  </label>
                </div>
                <div className="input-container">
                  <label htmlFor="vpassword">
                    <span>Confirm Password</span>
                    <input
                      id="vpassword"
                      type="password"
                      name="vpassword"
                      placeholder=""
                      autoComplete="new-password"
                      required
                      onChange={e => this.handleInputChange({ vpassword: e.target.value })}
                      value={signupData.vpassword}
                    />
                  </label>
                </div>
                <div className="form-button-wrapper">
                  <Button type="submit" className="btn-link btn-link-primary">
                    Signup
                  </Button>
                  <Button className="btn-link btn-link-secondary cancel-btn" onClick={this.toggleModal}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
