export const BASE_URL = 'http://localhost:3000';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({password, email}) => {
    return fetch(`${BASE_URL}/signup`, {
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
    .then((data) => {
      localStorage.setItem('jwt', data.token)
      return data;
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

