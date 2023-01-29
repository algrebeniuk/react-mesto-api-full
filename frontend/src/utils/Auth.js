export const BASE_URL = 'https://auth.nomoreparties.co';
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json.then((err) => {
    Promise.reject(err);
  })
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password, 
        email: email
      })
    })
    .then((res) => {
      return checkResponse(res)
    })
  };

export const authorize = ({password, email}) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password, 
        email
      })
    })
    .then((res) => {
      return checkResponse(res)
    })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      return checkResponse(res)
    })
  }
  

