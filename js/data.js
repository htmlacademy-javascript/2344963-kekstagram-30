import {getRandomPositiveInteger, getRandomId, getRandomArrayElement} from './util.js';

const PHOTO_COUNT = 25;

const DESCRIPTION_LIST = [
  'Замечательный вид!',
  'Красота в каждой детали',
  'Момент запечатлён!',
  'Настроение мгновенно лучше',
  'Прекрасный день',
  'Так приятно было увидеть это',
  'Фотогеничное место',
  'Очаровательная атмосфера',
  'Без слов',
  'Приятные воспоминания'
];

const MESSAGES_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Иван', 'Алексей', 'Елена', 'Мария', 'Андрей', 'Ольга', 'Николай', 'Анна', 'Дмитрий', 'Светлана'];


const getCommentId = getRandomId(1, 999);
const getPhotoId = getRandomId(1, PHOTO_COUNT);

function createCommentData() {
  const commentId = getCommentId();

  return ({
    id: commentId,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES_LIST),
    name: getRandomArrayElement(NAMES),
  });
}

function createPhotoData() {
  const photoId = getPhotoId();

  return ({
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_LIST),
    likes: getRandomPositiveInteger(0, 200),
    comments: Array.from({ length: getRandomPositiveInteger(0, 30) }, createCommentData),
  });
}

const photosData = Array.from({ length: PHOTO_COUNT }, createPhotoData);

export {photosData};
