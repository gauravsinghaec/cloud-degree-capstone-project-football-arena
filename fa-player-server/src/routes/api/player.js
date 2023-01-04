const express = require('express');

const router = express.Router();
const requestHandler = require('../../controllers/playerController');

/**
 * API endpoints to return all players data in json format.
 * it also alows to filter the result by name if provided
 */
router.get('/getAllPlayers', (req, res) => {
  const playerName = req.query.name;
  requestHandler.getPlayerList({ player_name: playerName }, (err, playerList) => {
    if (err) res.status(500).json({ error: err });
    res.json(playerList);
  });
});

/**
 * HTTP method and route path.
 * The handler is (separate for every HTTP methods)
 * inside the process controller.
 */
router.route('/player/:id?')
  .get((req, res) => {
    requestHandler.getHandler(req, res)
      .then(resObj => res.json(resObj))
      .catch(error => res.status(500).json(error));
  })
  .post((req, res) => {
    requestHandler.postHandler(req, res)
      .then(resObj => res.json(resObj))
      .catch(error => res.status(500).json(error));
  })
  .put((req, res) => {
    requestHandler.putHandler(req, res)
      .then(resObj => res.json(resObj))
      .catch(error => res.status(500).json(error));
  })
  .delete((req, res) => {
    requestHandler.deleteHandler(req, res)
      .then(resObj => res.json(resObj))
      .catch(error => res.status(500).json(error));
  });

module.exports = router;
