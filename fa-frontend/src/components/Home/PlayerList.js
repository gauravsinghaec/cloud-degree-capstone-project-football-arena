import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const PlayerDetails = ({ footballer }) => (
  <article className="gv-grid-cell">
    <div className="gv-grid-cell-inner">
      <div className="gv-grid-cell-image-container">
        <img className="gv-grid-cell-image" src={`assets/images/${footballer.name}.png`} alt="" />
      </div>
      <div className="gv-grid-cell-info">
        <div className="gv-grid-cell-title">{footballer.name}</div>
        <div className="gv-grid-cell-subtitle">{footballer.nationality}</div>
      </div>
    </div>
    <Link to={`/player/${footballer.id}`} className="player-link">
      <span className="player-link-label"><strong>Info</strong></span>
    </Link>
  </article>
);

PlayerDetails.propTypes = { footballer: PropTypes.instanceOf(Object).isRequired };

const PlayerList = ({ footballers }) => (
  <section className="players-container">
    {footballers.map(footballer => (
      <PlayerDetails key={footballer.id} footballer={footballer} />
    ))}
  </section>
);

PlayerList.propTypes = { footballers: PropTypes.instanceOf(Array).isRequired };

export default PlayerList;
