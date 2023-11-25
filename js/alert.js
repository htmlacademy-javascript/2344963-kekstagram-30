import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

let isAlertOpen = false;

function showAlert(id) {
  isAlertOpen = true;
  const alertTemplate = document.querySelector(`#${id}`).content.querySelector(`.${id}`);
  const alertElement = alertTemplate.cloneNode(true);
  const alertContainer = document.querySelector('body');
  alertContainer.append(alertElement);

  if (alertElement.querySelector(`.${id}__button`)) {
    alertElement.querySelector(`.${id}__button`).addEventListener('click', onCloseButtonClick(alertElement));
    document.addEventListener('keydown', onDocumentKeydown(alertElement));
    alertElement.addEventListener('click', onWindowClick(alertElement));
  }

  setTimeout(() => {
    hideAlert(alertElement);
  }, ALERT_SHOW_TIME);
}

function hideAlert(alertElement) {
  isAlertOpen = false;
  alertElement.remove();
}

function onDocumentKeydown(alertElement) {
  return function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideAlert(alertElement);
    }
  };
}

function onCloseButtonClick(alertElement) {
  return function (evt) {
    evt.preventDefault();
    hideAlert(alertElement);
  };
}

function onWindowClick(alertElement) {
  return function (evt) {
    if (evt.target === alertElement) {
      const modal = alertElement.querySelector('div');
      if (evt.target !== modal && !modal.contains(evt.target)) {
        hideAlert(alertElement);
      }
    }
  };
}

export { showAlert, isAlertOpen };
