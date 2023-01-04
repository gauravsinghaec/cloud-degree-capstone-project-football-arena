import config from '../config/config';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const getAllPlayers = () => (
  fetch(`${config.apiHost}/api/getAllPlayers`, { headers })
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((playersData) => {
          if (playersData) {
            return playersData;
          }
          throw Error(`Could not convert API response to JSON: ${playersData}`);
        });
      }
      throw Error('ServerError: Failed to load players from Server');
    })
    .then(data => data)
);

export const getPlayerDetails = id => (
  fetch(`${config.apiHost}/api/player/${id}`, { headers })
    .then(res => (
      res.json().then((data) => {
        if (res.status === 200) {
          return data;
        }
        return { status: res.status, message: data.message };
      })
    ))
);

export const updatePlayerDetails = (id, reqBody) => (
  fetch(`${config.apiHost}/api/player/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(reqBody),
  })
    .then(res => (
      res.json().then((data) => {
        if (res.status === 200) {
          return data;
        }
        return { status: res.status, message: data.message };
      })
    ))
);
