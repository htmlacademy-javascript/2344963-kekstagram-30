function getRandomPositiveInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const randomPositiveInteger = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(randomPositiveInteger);
}

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}
function isEnterKey(evt) {
  return evt.key === 'Enter';
}

export { debounce, getRandomPositiveInteger, getRandomArrayElement, isEscapeKey, isEnterKey };
