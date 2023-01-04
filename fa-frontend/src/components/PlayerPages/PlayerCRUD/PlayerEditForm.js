import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as FootballersAPI from '../../../utils/FootballersAPI';

class PlayerEditForm extends Component {
  static propTypes = {
    playerObj: PropTypes.instanceOf(Object).isRequired,
    updatePageMode: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { playerObj, updatePageMode } = this.props;
    const reqBody = {
      name: playerObj.name,
      age: playerObj.age,
      nationality: playerObj.nationality,
      nationalityPos: playerObj.nationalPosition,
      club: playerObj.club,
      clubPos: playerObj.clubPosition,
      rating: playerObj.rating,
    };
    // Update the footballer's data in the server
    FootballersAPI.updatePlayerDetails(playerObj.id, reqBody)
      .then((info) => {
        console.log('Player update succeeded');
        updatePageMode('view');
      })
      .catch(e => console.log(e));
  }

  render() {
    const { playerObj, updatePageMode, handleInputChange } = this.props;
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">
              <span>Name</span>
              <input id="name" type="text" name="name" onChange={e => handleInputChange({ name: e.target.value })} value={playerObj.name} autoFocus />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="age">
              <span>Age</span>
              <input id="age" type="number" name="age" onChange={e => handleInputChange({ age: e.target.value })} value={playerObj.age} />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="rating">
              <span>Rating</span>
              <input id="rating" type="number" name="rating" onChange={e => handleInputChange({ rating: e.target.value })} value={playerObj.rating} />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="club">
              <span>Club</span>
              <input id="club" type="text" name="club" onChange={e => handleInputChange({ club: e.target.value })} value={playerObj.club} />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="club-position">
              <span>Club Position</span>
              <input id="club-position" type="text" name="clubPos" onChange={e => handleInputChange({ clubPosition: e.target.value })} value={playerObj.clubPosition} />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="nationality">
              <span>Nationality</span>
              <input id="nationality" type="text" name="nationality" onChange={e => handleInputChange({ nationality: e.target.value })} value={playerObj.nationality} />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="nationality-position">
              <span>National Position</span>
              <input id="nationality-position" type="text" name="nationalityPos" onChange={e => handleInputChange({ nationalPosition: e.target.value })} value={playerObj.nationalPosition} />
            </label>
          </div>
          <div className="form-button-wrapper">
            <button type="submit" className="btn-link btn-link-primary">Save</button>
            <button type="button" className="btn-link btn-link-secondary cancel-btn" onClick={() => updatePageMode('view')}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PlayerEditForm;
