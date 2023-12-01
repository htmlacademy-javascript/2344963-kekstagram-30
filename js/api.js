const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data/',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

function load(route, errorText, method = Method.GET, body = null) {
  return fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });
}

function getData() {
  return load(Route.GET_DATA, ErrorText.GET_DATA);
}

function sendData(body) {
  return load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);
}

export { getData, sendData };
