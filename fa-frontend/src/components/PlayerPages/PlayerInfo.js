import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import * as FootballersAPI from '../../utils/FootballersAPI';
import {
  DeletePlayerPopup,
  PlayerEditForm,
  PlayerViewData,
} from './PlayerCRUD';

class PlayerInfo extends Component {
  state = {
    playerObj: {},
    pageMode: 'view',
    alertMsg: '',
    alertVisible: false,
  }

  // Fetch footballers from server
  componentDidMount() {
    const playerId = this.props.match.params.id;
    FootballersAPI.getPlayerDetails(playerId)
      .then((info) => {
        if (info.status) {
          this.setState({ alertVisible: true, alertMsg: info.message });
        } else {
          console.log('Player Info Server API Call succeeded');
          this.setState({ playerObj: info });
        }
      })
      .catch(e => console.log(e));
  }

  handleInputChange = (newPartialInput) => {
    this.setState(state => ({
      playerObj: {
        ...state.playerObj,
        ...newPartialInput,
      },
    }));
  }

  updatePageMode = mode => this.setState({ pageMode: mode });

  // This method is used to hide the alert message
  onDismiss = () => {
    this.setState({ alertVisible: false, alertMsg: '' });
  }

  render() {
    const { playerObj, pageMode } = this.state;
    const someProps = { playerObj, updatePageMode: this.updatePageMode };
    return (
      <React.Fragment>
        <PlayerData>
          <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismiss}>{this.state.alertMsg}</Alert>
          {playerObj.Name && (<PlayerImage imageName={playerObj.Name} />)}
          {pageMode === 'view' && (<PlayerViewData {...someProps} />)}
          {pageMode === 'edit' && (<PlayerEditForm {...someProps} handleInputChange={this.handleInputChange} />)}
        </PlayerData>
        <DeletePlayerPopup />
      </React.Fragment>
    );
  }
}

const PlayerData = ({ children }) => (
  <section className="player-info">
    {children}
  </section>
);

const PlayerImage = ({ imageName }) => (
  <div className="image-container">
    <img className="player-image" src={`../images/${imageName}.png`} alt="pic of player" />
  </div>
);

PlayerImage.propTypes = { imageName: PropTypes.string.isRequired };

export default PlayerInfo;
