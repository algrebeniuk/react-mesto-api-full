class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
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
            headers: this._headers
        });
        return this._serverСorrectness(res);
    }

    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        });
        return this._serverСorrectness(res);
    }

    async editProfile(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
        return this._serverСorrectness(res);
    }

    async addNewCard(data) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link 
            })
        });
        return this._serverСorrectness(res);
    }

    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
        return this._serverСorrectness(res);
    }

    async setLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        });
        return this._serverСorrectness(res);
    }

    async deleteLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        });
        return this._serverСorrectness(res);
    }

    async editAvatar(data) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        });
        return this._serverСorrectness(res);
    }

    async changeLikeCardStatus(cardId, isLiked) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        });
        return this._serverСorrectness(res);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
      authorization: 'aa0e6b89-9ade-4bd3-831f-2c58dd712b31',
      'Content-Type': 'application/json'
    }
});

export default api;