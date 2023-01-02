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

export default class LoginModal extends Component {
  state = {
    alertMsg: '',
    alertVisible: false,
    modal: false,
    signinData: {
      email: '',
      password: '',
    },
  }

  toggle = () => {
    this.setState(prevState => (
      { modal: !prevState.modal }
    ));
  }

  handleInputChange = (newPartialInput) => {
    this.setState(prevState => ({
      ...prevState,
      signinData: {
        ...prevState.signinData,
        ...newPartialInput,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { signinData } = this.state;
    // Update the footballer's data in the server
    AuthAPI.signinUser(signinData)
      .then((data) => {
        if (data.status) {
          this.setState({ alertVisible: true, alertMsg: data.message });
        } else {
          console.log('Signin sucessful.', data); // eslint-disable-line no-console
        }
      })
      .catch(e => console.log(e));
  }

  // This method is used to hide the alert message
  onDismiss = () => {
    this.setState({ alertVisible: false, alertMsg: '' });
  }

  render() {
    const { signinData } = this.state;
    return (
      <Fragment>
        <DropdownItem id="dropdown-auth-link" onClick={this.toggle}>{this.props.buttonLabel}</DropdownItem>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Login
          </ModalHeader>
          <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismiss}>{this.state.alertMsg}</Alert>
          <ModalBody>
            <div className="form-container">
              <form onSubmit={this.handleSubmit}>
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
                      value={signinData.email}
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
                      autoComplete="current-password"
                      required
                      onChange={e => this.handleInputChange({ password: e.target.value })}
                      value={signinData.password}
                    />
                  </label>
                </div>
                <div className="form-button-wrapper">
                  <Button type="submit" className="btn-link btn-link-primary">
                    Login
                  </Button>
                  <Button className="btn-link btn-link-secondary cancel-btn" onClick={this.toggle}>
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
