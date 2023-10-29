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

function getRandomPositiveInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomId(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateCommentId = getRandomId(1, 999);
const generatePhotoId = getRandomId(1, PHOTO_COUNT);

function createComment() {
  const commentId = generateCommentId();

  return ({
    id: commentId,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: MESSAGES_LIST[getRandomPositiveInteger(0, MESSAGES_LIST.length - 1)],
    name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
  });
}

function createPhoto() {
  const photoId = generatePhotoId();

  return ({
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTION_LIST[getRandomPositiveInteger(0, DESCRIPTION_LIST.length - 1)],
    likes: getRandomPositiveInteger(0, 200),
    comments: Array.from({ length: getRandomPositiveInteger(0, 30) }, createComment),
  });
}

const photos = Array.from({ length: PHOTO_COUNT }, createPhoto);

console.log(photos);
