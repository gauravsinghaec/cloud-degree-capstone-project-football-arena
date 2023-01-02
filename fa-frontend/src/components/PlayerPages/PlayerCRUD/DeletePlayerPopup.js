import React from 'react';

const DeletePlayerPopup = () => (
  <div className="modal fade confirmation-modal" id="deletePlayerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered content-wrapper" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="w-100">
            <strong>DELETE</strong>
            Player
          </h2>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            You will lose the player data permanently once it is deleted.
            Do you still want to proceed?
          </p>
        </div>
        <form>
          <input type="hidden" name="_method" value="DELETE" />
          <div className="modal-footer">
            <button type="button" className="btn-link btn-link-primary" id="player-delete-btn">Yes</button>
            <button type="button" className="btn-link btn-link-secondary" data-dismiss="modal">No</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default DeletePlayerPopup;
