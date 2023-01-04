const FootballerModel = require('../models/footballer');

const getPlayerList = async (filterObj, callback) => {
  const queryFilter = { where: {} };
  if (filterObj.player_name) {
    queryFilter.where.name = filterObj.player_name;
  }
  const result = await FootballerModel.findAll(queryFilter).catch((err) => {
    console.log('something went wrong while fething players from database.', err);
    callback(err, undefined);
  })
  callback(undefined, result);
};

const getHandler = async (req) => {
  const { id } = req.params;
  const playerInfo = await FootballerModel.findById(id).catch((err) => {
    console.log('something went wrong while finding player in database.', err);
    throw Error(err)
  })
  return playerInfo
};

const postHandler = async (req) => {
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
  const result = await FootballerModel.create(playerObj).catch((err) => {
    console.log('something went wrong while creating player in database.', err);
    throw Error(err)
  });
  return result
};

const putHandler = async (req) => {
  const { id } = req.params;
  const playerDataFromReq = req.body;
  const player = await FootballerModel.findById(id);
  if (!player) {
    console.log('can not find player in database.', err);
    throw Error(err)
  }
  const playerObj = {
    name: playerDataFromReq.name,
    age: playerDataFromReq.age,
    nationality: playerDataFromReq.nationality,
    national_position: playerDataFromReq.nationalityPos,
    club: playerDataFromReq.club,
    club_position: playerDataFromReq.clubPos,
    rating: playerDataFromReq.rating,
  };
  const result = await FootballerModel.update(playerObj, { where: id }).catch((err) => {
    console.log('something went wrong while updating player in database.', err);
    throw Error(err)
  });
  return result
};

const deleteHandler = async (req) => {
  const { id } = req.params;
  const player = await FootballerModel.findById(id);
  if (!player) {
    console.log('can not find player in database.', err);
    throw Error(err)
  }
  const result = await FootballerModel.destroy({ where: id }).catch((err) => {
    console.log('something went wrong while deleting player in database.', err);
    throw Error(err)
  });
  return result
};

module.exports = {
  getPlayerList,
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
