import './full-image.js';
import './form-imgupload.js';
import './image-editor.js';
import { setUserFormSubmit, hideModal } from './form-imgupload.js';
import { renderPictures, saveData } from './thumbnail-images.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { showFilters } from './filters.js';

getData()
  .then((data) => {
    window.console.log(data);
    showFilters();
    saveData(data);
    renderPictures(data);
  })
  .catch((error) => {
    showAlert('data-error');
    window.console.log(error);
  });

setUserFormSubmit(hideModal);
