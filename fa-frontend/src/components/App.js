import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PlayerList } from './Home';
import { Header, Footer } from './Layout';
import * as FootballersAPI from '../utils/FootballersAPI';
import { Pagination } from './Pagination';
import { PlayerInfo } from './PlayerPages';
import * as AuthAPI from '../utils/AuthAPI';

class App extends Component {
  state = {
    footballers: [],
    itemsPerPage: 10,
    activePage: 1,
    user: null,
  }

  componentWillMount() {
    // check the token for validity
    if (AuthAPI.loggedIn()) {
      try {
        // get decoded token and store it in user state
        const profile = AuthAPI.getProfile();
        this.setState({
          user: { id: profile.sub, name: profile.name },
        });
      } catch (err) {
        AuthAPI.logout();
      }
    }
  }

  // Fetch footballers from server
  componentDidMount() {
    FootballersAPI.getAllPlayers()
      .then((footballers) => {
        this.setState({
          footballers,
          total: footballers.length,
        });
      })
      .catch(error => this.handleAPIError(error));
  }

  /**
   * catch handler for REST API request error
   * it add HTML element with error message to UI
   * @param:
   *      error (data type: object): Error object with error details
   * @returns:
   *      None
   */
  handleAPIError = (error) => {
    const errorElement = window.document.querySelector('.app-header');
    const errorPara = window.document.createElement('p');
    errorPara.className = 'error';
    errorPara.textContent = error;
    errorPara.style = 'color: red; margin: 20px auto;';
    errorElement.insertAdjacentElement('afterend', errorPara);
  }

  /**
   * This handler function sets the activePage on real-time
   * It is then user to filter players to be shown on tha page
   * @param:
   *      activePage(data type: number): current page
   * @returns:
   *      None
   */
  handlePageChange = activePage => this.setState({ activePage })

  /**
   * This handler function resets the user state to null
   * and calls the API to remove the token from the localStorage
   * @param: None
   * @returns: None
   */
  handleLogout = () => {
    AuthAPI.logout();
    this.setState({ user: null });
    window.location = '/';
  }

  render() {
    const {
      footballers,
      activePage,
      itemsPerPage,
      total,
      user,
    } = this.state;
    // Logic for displaying footballers on selected page
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const renderedFootballers = footballers.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="app">
        <Header profile={user} logoutUser={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <main role="main" className="main-section">
                <PlayerList footballers={renderedFootballers} />
                <Pagination
                  margin={1}
                  page={activePage}
                  count={Math.ceil(total / itemsPerPage)}
                  onPageChange={this.handlePageChange}
                />
              </main>
            )}
          />
          <Route
            path="/player/:id"
            render={({ match }) => (
              <main role="main" className="main-section">
                <PlayerInfo match={match} />
              </main>
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
