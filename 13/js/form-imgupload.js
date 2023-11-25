import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { showAlert, isAlertOpen } from './alert.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const cancel = form.querySelector('.img-upload__cancel');
const modal = form.querySelector('.img-upload__overlay');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submit = form.querySelector('.img-upload__submit');

const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectLevel = document.querySelector('.img-upload__effect-level');


const hashtagRegularExpression = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isAlertOpen) {
    evt.preventDefault();
    hideModal();
  }
}

function showModal() {
  if (this.files && this.files[0]) {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');

    cancel.addEventListener('click', hideModal);
    document.addEventListener('keydown', onDocumentKeydown);
    input.removeEventListener('change', showModal);
  }
}

function hideModal() {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');

  cancel.removeEventListener('click', hideModal);
  document.removeEventListener('keydown', onDocumentKeydown);
  input.addEventListener('change', showModal);
  imgUploadPreview.style = 'none';
  effectLevel.classList.add('hidden');
  input.value = '';
  form.reset();
}

function validateCommentField(value) {
  return value.length <= 140;
}


function validateHashtagField(value) {
  if (value.length === 0) {
    return true;
  }

  const arrayHashtags = value.split(' ');
  let isValid = true;

  arrayHashtags.forEach((element) => {
    if (!hashtagRegularExpression.test(element)) {
      isValid = false;
    }
  });

  return isValid;
}

function checksHashtagsCount(value) {
  const arrayHashtags = value.split(' ');
  return arrayHashtags.length <= 5;
}

function checksHashtagsForRepetition(value) {
  const arrayHashtags = value.split(' ');
  const newArrayHashtags = [];
  let isValid = true;

  arrayHashtags.forEach((element) => {
    if (newArrayHashtags.indexOf(element.toLowerCase()) !== -1) {
      isValid = false;
    } else {
      newArrayHashtags.push(element.toLowerCase());
    }
  });

  return isValid;
}

const blockSubmitButton = () => {
  submit.disabled = true;
};

const unblockSubmitButton = () => {
  submit.disabled = false;
};

function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showAlert('success');
        })
        .catch((error) => {
          showAlert('error');
          window.console.log(error);
        })
        .finally(unblockSubmitButton);
    }
  });
}

pristine.addValidator(commentField, validateCommentField, 'Длина комментария больше 140 символов', 1, false);
pristine.addValidator(hashtagField, validateHashtagField, 'Хэш-тег должен начинаться с #, и иметь от 1 до 19 символов после #, хэш-теги должны быть разделены пробелом', 3, false);
pristine.addValidator(hashtagField, checksHashtagsCount, 'Превышено количество хэш-тегов, максимум 5', 1, false);
pristine.addValidator(hashtagField, checksHashtagsForRepetition, 'Хэш-теги не должны повторяться', 2, false);


input.addEventListener('change', showModal);


export { setUserFormSubmit, hideModal };
