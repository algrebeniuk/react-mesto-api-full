export const baseUrl = 'http://localhost:3000';

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _serverСorrectness(res) {
        if (res.ok) {
            return res.json();
        }
            return Promise.reject(`Ошибка: ${res.status}`);            
    }

    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json',
            },    
        });
        return this._serverСorrectness(res);
    }

    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
              },   
        });
        return this._serverСorrectness(res);
    }

    async editProfile({name, about}) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
              },   
            body: JSON.stringify({
                name,
                about
            })
        });
        return this._serverСorrectness(res);
    }

    async addNewCard({name, link}) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },   
            body: JSON.stringify({
                name,
                link
            })
        });
        return this._serverСorrectness(res);
    }

    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },   
        });
        return this._serverСorrectness(res);
    }

    async setLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }, 
        });
        return this._serverСorrectness(res);
    }

    async deleteLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }, 
        });
        return this._serverСorrectness(res);
    }

    async editAvatar({avatar}) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                avatar
            })
        });
        return this._serverСorrectness(res);
    }

    async changeLikeCardStatus(cardId, isLiked) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }, 
        });
        return this._serverСorrectness(res);
    }
}

const api = new Api(
    baseUrl,
);

export default api;