import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PlayerViewData = ({ playerObj, updatePageMode }) => (
  <div className="info-container">
    <table>
      <tbody>
        <tr className="tablerow">
          <td>Name</td>
          <td>{playerObj.Name}</td>
        </tr>
        <tr className="tablerow">
          <td>Age</td>
          <td>{playerObj.Age}</td>
        </tr>
        <tr className="tablerow">
          <td>Rating</td>
          <td>{playerObj.Rating}</td>
        </tr>
        <tr className="tablerow">
          <td>Club</td>
          <td>{playerObj.Club}</td>
        </tr>
        <tr className="tablerow">
          <td>Club Position</td>
          <td>{playerObj.Club_Position}</td>
        </tr>
        <tr className="tablerow">
          <td>Nationality</td>
          <td>{playerObj.Nationality}</td>
        </tr>
        <tr className="tablerow">
          <td>Nat. Position</td>
          <td>{playerObj.National_Position}</td>
        </tr>
      </tbody>
    </table>
    <div className="form-button-wrapper">
      <button type="button" className="btn-link btn-link-primary player-edit-link" onClick={() => updatePageMode('edit')}>Edit</button>
      <Link className="btn-link btn-link-secondary back-link" to="/">Back</Link>
    </div>
    <div className="delete-button-wrapper">
      <button type="button" className="btn-link delete-btn" data-toggle="modal" data-target="#deletePlayerModal">
        <i className="fas fa-trash" />
      </button>
    </div>
  </div>
);

PlayerViewData.propTypes = { playerObj: PropTypes.instanceOf(Object).isRequired };
PlayerViewData.propTypes = { updatePageMode: PropTypes.func.isRequired };

export default PlayerViewData;
