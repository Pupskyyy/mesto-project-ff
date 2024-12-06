const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
  headers: {
    authorization: '2d9d5177-d0fa-4e72-8d87-ace36bc28297',
    'Content-Type': 'application/json'
  }
};

export const getInitialUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const patchInitialCards = (cardData) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-28/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

export const patchProfileData = (name, about) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-28/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const patchProfileImage = (avatar) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-28/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

  export const deleteCardServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

  export const likeCardServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  export const delteLikeCardServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };