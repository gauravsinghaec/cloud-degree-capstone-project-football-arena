import decode from 'jwt-decode';
import config from '../config/config';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};


const setToken = (token) => {
  // Saves user token to localStorage
  localStorage.setItem('token', token);
};

const getToken = () => (
  // Retrieves the user token from localStorage
  localStorage.getItem('token')
);

/**
 * Check if the token is expired/valid or not
 * @param:
 *      token (data type: object): JWT token object
 * @returns:
 *      true/false (data type: boolean)
 */
const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired. N
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('token');
};

/**
 * Get the user info from the token's paylod
 * @param:
 *      None
 * @returns:
 *      decoded token (data type: object): user info
 *
 * @examples:
 *    returns {sub: "5bbc17a806d4832b90ebf4ab", name: "Gaurav", iat: 1539333112}
 */
export const getProfile = () => (
  // Using jwt-decode npm package to decode the token
  decode(getToken())
);

/**
 * Check if any user is loggen in or not
 * @param:
 *      None
 * @returns:
 *      true/false (data type: boolean): user's login status(success or failure)
 */
export const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  // Getting token from localstorage
  const token = getToken();
  // handwaiving here
  return !!token && !isTokenExpired(token);
};

/**
 * All response will be in JSON so first get the object using res.json()
 * now inside .then we can check if the outer res.status (fetch response)
 * is ok (res.ok or res.status === 200), if so return data otherwise
 * customise the data to be sent further in chain. When (status !== 200)
 * the data will be in { message: 'error message' } format
 * @param:
 *      error (data type: object): Error object with error details
 * @returns:
 *      None
 */
export const signinUser = reqBody => (
  fetch(`${config.apiHost}/auth/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify(reqBody),
  })
    .then(res => (
      res.json().then((data) => {
        if (res.status === 200) {
          setToken(data.token);
          return data;
        }
        return { status: res.status, message: data.message };
      })
    ))
);

export const signupUser = reqBody => (
  fetch(`${config.apiHost}/auth/signup`, {
    method: 'POST',
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
