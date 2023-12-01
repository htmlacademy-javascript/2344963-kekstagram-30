import './full-image.js';
import './form-img-upload.js';
import './image-editor.js';
import { setUserFormSubmit, hideModal } from './form-img-upload.js';
import { renderPictures, saveData } from './thumbnail-images.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { showFilters } from './filters.js';

getData()
  .then((data) => {
    showFilters();
    saveData(data);
    renderPictures(data);
  })
  .catch(() => {
    showAlert('data-error');
  });

setUserFormSubmit(hideModal);
