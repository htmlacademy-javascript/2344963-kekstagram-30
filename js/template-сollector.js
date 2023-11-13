const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElemet = ({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.setAttribute('id', id);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderPictures = (picturesData) => {
//создаем закадровый DOM объект для добавления эллементов узлов DOM для того, чтобы не производить перекомпановку страницы после каждого добавленого узла
  const picturesListFragment = document.createDocumentFragment();
  picturesData.forEach((pictureData) => {
    const pictureElement = createPictureElemet(pictureData);
    picturesListFragment.append(pictureElement);
  });
  picturesListElement.append(picturesListFragment);
};

export {renderPictures};
