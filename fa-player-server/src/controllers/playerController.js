const FootballerModel = require('../models/footballer');

const getPlayerList = async (filterObj, callback) => {
  console.log('process.env.POSTGRES_HOST', process.env.POSTGRES_HOST)
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
  const playerInfo = await FootballerModel.findByPk(id).catch((err) => {
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
    nationalPosition: playerDataFromReq.nationalityPos,
    club: playerDataFromReq.club,
    clubPosition: playerDataFromReq.clubPos,
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
  const player = await FootballerModel.findByPk(id);
  console.log({ player })
  if (!player) {
    console.log('can not find player in database.', err);
    throw Error(err)
  }
  const playerObj = {
    name: playerDataFromReq.name,
    age: playerDataFromReq.age,
    nationality: playerDataFromReq.nationality,
    nationalPosition: playerDataFromReq.nationalityPos,
    club: playerDataFromReq.club,
    clubPosition: playerDataFromReq.clubPos,
    rating: playerDataFromReq.rating,
  };
  const result = await player.update(playerObj).catch((err) => {
    console.log('something went wrong while updating player in database.', err);
    throw Error(err)
  });
  return result
};

const deleteHandler = async (req) => {
  const { id } = req.params;
  const player = await FootballerModel.findByPk(id);
  if (!player) {
    console.log('can not find player in database.', err);
    throw Error(err)
  }
  const result = await player.destroy().catch((err) => {
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
