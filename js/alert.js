import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

let isAlertOpen = false;
let alertElement;
let alertTimer;

function showAlert(id) {
  isAlertOpen = true;
  const alertTemplate = document.querySelector(`#${id}`).content.querySelector(`.${id}`);
  alertElement = alertTemplate.cloneNode(true);
  const alertContainer = document.querySelector('body');
  alertContainer.append(alertElement);

  if (alertElement.querySelector(`.${id}__button`)) {
    alertElement.querySelector(`.${id}__button`).addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    alertElement.addEventListener('click', onWindowClick);
  }

  alertTimer = setTimeout(() => {
    hideAlert();
  }, ALERT_SHOW_TIME);
}

function hideAlert() {
  isAlertOpen = false;
  alertElement.remove();
  clearTimeout(alertTimer);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideAlert();
  }
}

function onCloseButtonClick(evt) {
  evt.preventDefault();
  hideAlert();
}

function onWindowClick(evt) {
  if (evt.target === alertElement) {
    const modal = alertElement.querySelector('div');
    if (evt.target !== modal && !modal.contains(evt.target)) {
      hideAlert();
    }
  }
}

export { showAlert, isAlertOpen };
