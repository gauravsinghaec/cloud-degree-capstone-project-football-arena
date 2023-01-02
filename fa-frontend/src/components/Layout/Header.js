import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { LoginModal, SignupModal } from '../Auth';

export default class Header extends Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState(prevState => (
      { isOpen: !prevState.isOpen }
    ));
  }

  render() {
    const { profile, logoutUser } = this.props;
    return (
      <header className="app-header">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">FA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                {profile && profile.name
                  ? (
                    <Fragment>
                      <DropdownToggle nav caret>
                        <i className="fas fa-user-alt fa-lg" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="dropdown-auth-link">{profile.name}</DropdownItem>
                        <DropdownItem className="dropdown-auth-link" onClick={logoutUser}>Logout</DropdownItem>
                      </DropdownMenu>
                    </Fragment>
                  )
                  : (
                    <Fragment>
                      <DropdownToggle nav caret>
                        <i className="fas fa-user-alt-slash fa-lg-slash" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <LoginModal buttonLabel="Login" className="auth-modal" />
                        <SignupModal buttonLabel="Signup" className="auth-modal" />
                      </DropdownMenu>
                    </Fragment>
                  )
                }
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
