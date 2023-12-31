import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { showAlert, isAlertOpen } from './alert.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_REGULAR_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const cancel = form.querySelector('.img-upload__cancel');
const modal = form.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview img');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submit = form.querySelector('.img-upload__submit');
const effectsPreview = document.querySelectorAll('.effects__preview');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

function isTextFieldFocused() {
  return document.activeElement === hashtagField ||
    document.activeElement === commentField;
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isAlertOpen) {
    evt.preventDefault();
    hideModal();
  }
}

function onCanelButton() {
  hideModal();
}

function showModal() {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');

  cancel.addEventListener('click', onCanelButton);
  document.addEventListener('keydown', onDocumentKeydown);
  input.disabled = true;
}

function hideModal() {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');

  cancel.removeEventListener('click', onCanelButton);
  document.removeEventListener('keydown', onDocumentKeydown);

  input.disabled = false;

  imgUploadPreview.style = 'none';
  effectLevel.classList.add('hidden');
  input.value = '';
  effectLevelValue.setAttribute('value', '');
  form.reset();
  pristine.reset();
}

function onChooseFile() {
  if (this.files && this.files[0]) {
    const file = this.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.src = URL.createObjectURL(file);
      effectsPreview.forEach((element) => {
        element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      });
      showModal();
    }
  }
}

function validateCommentField(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}


function validateHashtagField(value) {
  if (value.length === 0) {
    return true;
  }

  const arrayHashtags = value.split(' ').filter(Boolean);
  let isValid = true;

  arrayHashtags.forEach((element) => {
    if (!HASHTAG_REGULAR_EXPRESSION.test(element)) {
      isValid = false;
    }
  });

  return isValid;
}

function checksHashtagsCount(value) {
  const arrayHashtags = value.split(' ').filter(Boolean);
  return arrayHashtags.length <= MAX_HASHTAGS_COUNT;
}

function checksHashtagsForRepetition(value) {
  const arrayHashtags = value.split(' ').filter(Boolean);
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

function blockSubmitButton() {
  submit.disabled = true;
}

function unblockSubmitButton() {
  submit.disabled = false;
}

function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      input.disabled = false;
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showAlert('success');
        })
        .catch(() => {
          showAlert('error');
        })
        .finally(unblockSubmitButton);
    }
  });
}

pristine.addValidator(commentField, validateCommentField, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`, 1, false);
pristine.addValidator(hashtagField, validateHashtagField, 'Хэш-тег должен начинаться с #, и иметь от 1 до 19 символов после #, хэш-теги должны быть разделены пробелом', 3, false);
pristine.addValidator(hashtagField, checksHashtagsCount, `Превышено количество хэш-тегов, максимум ${MAX_HASHTAGS_COUNT}`, 1, false);
pristine.addValidator(hashtagField, checksHashtagsForRepetition, 'Хэш-теги не должны повторяться', 2, false);


input.addEventListener('change', onChooseFile);


export { setUserFormSubmit, hideModal };
