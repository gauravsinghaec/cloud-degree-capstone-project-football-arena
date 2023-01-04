const FootballerModel = require('../models/footballer');

const getPlayerList = (filterObj, callback) => {
  const queryFilter = { $and: [{}] };
  if (filterObj.player_name) {
    queryFilter.$and.push({ name: filterObj.player_name });
  }
  FootballerModel.find(queryFilter, { name: 1, nationality: 1 }, (err, result) => {
    if (err) {
      console.log('something went wrong while fething players from database.', err);
      callback(err, undefined);
    } else if (result) {
      callback(undefined, result);
    } else if (!result) {
      callback(undefined, undefined);
    }
  });
};

const getHandler = (req) => {
  const { id } = req.params;
  return new Promise((resolve, reject) => {
    FootballerModel.findById(id, (err, playerInfo) => {
      if (err) {
        console.log('something went wrong while finding player in database.', err);
        reject(err);
      } else {
        resolve(playerInfo);
      }
    });
  });
};

const postHandler = (req) => {
  const playerDataFromReq = req.body;
  const playerObj = {
    name: playerDataFromReq.name,
    age: playerDataFromReq.age,
    nationality: playerDataFromReq.nationality,
    national_position: playerDataFromReq.nationalityPos,
    club: playerDataFromReq.club,
    club_position: playerDataFromReq.clubPos,
    rating: playerDataFromReq.rating,
  };
  const player = new FootballerModel(playerObj);
  return new Promise((resolve, reject) => {
    player.save((err, playerInfo) => {
      if (err) {
        console.log('something went wrong while creating player in database.', err);
        reject(err);
      } else {
        resolve(playerInfo);
      }
    });
  });
};

const putHandler = (req) => {
  const { id } = req.params;
  const playerDataFromReq = req.body;
  const playerObj = {
    name: playerDataFromReq.name,
    age: playerDataFromReq.age,
    nationality: playerDataFromReq.nationality,
    national_position: playerDataFromReq.nationalityPos,
    club: playerDataFromReq.club,
    club_position: playerDataFromReq.clubPos,
    rating: playerDataFromReq.rating,
  };
  return new Promise((resolve, reject) => {
    FootballerModel.findByIdAndUpdate(id, playerObj, { new: true }, (err, playerInfo) => {
      if (err) {
        console.log('something went wrong while updating player in database.', err);
        reject(err);
      } else {
        resolve(playerInfo);
      }
    });
  });
};

const deleteHandler = (req) => {
  const { id } = req.params;
  return new Promise((resolve, reject) => {
    FootballerModel.findByIdAndRemove(id, (err, playerInfo) => {
      if (err) {
        console.log('something went wrong while deleting player in database.', err);
        reject(err);
      } else {
        resolve(playerInfo);
      }
    });
  });
};

module.exports = {
  getPlayerList,
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
