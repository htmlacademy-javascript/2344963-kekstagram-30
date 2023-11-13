import {getPhotosData} from './data.js';
import {renderPictures} from './template-сollector.js';

// получаем массив данных для картинок
const photosData = getPhotosData();

renderPictures(photosData);
window.console.log(photosData);

