const lengthCheckString = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
window.console.log('Тест №1. Ожидаю true, получаю - ', lengthCheckString('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
window.console.log('Тест №2. Ожидаю true, получаю - ', lengthCheckString('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
window.console.log('Тест №3. Ожидаю false, получаю - ', lengthCheckString('проверяемая строка', 10)); // false

const isPalindrome = (string) => {
  const preparedString = string.toLowerCase().replaceAll(' ', '');

  for (let i = 1; i <= preparedString.length; i++) {
    if (preparedString[i - 1] !== preparedString.at(-i)) {
      return false;
    }
  }

  return true;
};

// Строка является палиндромом
window.console.log('Тест №1. Ожидаю true, получаю - ', isPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
window.console.log('Тест №2. Ожидаю true, получаю - ', isPalindrome('ДовОд')); // true
// Это не палиндром
window.console.log('Тест №3. Ожидаю false, получаю - ', isPalindrome('Кекс')); // false
// Это палиндром
window.console.log('Тест №4. Ожидаю true, получаю - ', isPalindrome('Лёша на полке клопа нашёл ')); // true

const numberFromString = (string) => parseInt(string.toString().replace(/[^\d]/g, ''), 10);

window.console.log('Тест №1. Ожидаю 2023, получаю - ', numberFromString('2023 год')); // 2023
window.console.log('Тест №2. Ожидаю 2022, получаю - ', numberFromString('ECMAScript 2022')); // 2022
window.console.log('Тест №3. Ожидаю 105, получаю - ', numberFromString('1 кефир, 0.5 батона')); // 105
window.console.log('Тест №4. Ожидаю 7, получаю - ', numberFromString('агент 007')); // 7
window.console.log('Тест №5. Ожидаю NaN, получаю - ', numberFromString('а я томат')); // NaN
window.console.log('Тест №6. Ожидаю 2023, получаю - ', numberFromString(2023)); //2023
window.console.log('Тест №7. Ожидаю 1, получаю - ', numberFromString(-1)); // 1
window.console.log('Тест №8. Ожидаю 15, получаю - ', numberFromString(1.5)); // 15

function getMinutesInteger (time) {
  return parseInt(time.split(':')[0], 10) * 60 + parseInt(time.split(':')[1], 10);
}

function isWorkTime (workBeginning, workEnding, meetingBeginning, meetingDuration) {
  workBeginning = getMinutesInteger(workBeginning);
  workEnding = getMinutesInteger(workEnding);
  meetingBeginning = getMinutesInteger(meetingBeginning);
  return workBeginning <= meetingBeginning && meetingBeginning + meetingDuration <= workEnding;
}

window.console.log('Тест №1. Ожидаю true, получаю - ', isWorkTime('08:00', '17:30', '14:00', 90)); // true
window.console.log('Тест №2. Ожидаю true, получаю - ', isWorkTime('8:0', '10:0', '8:0', 120)); // true
window.console.log('Тест №3. Ожидаю false, получаю - ', isWorkTime('08:00', '14:30', '14:00', 90)); // false
window.console.log('Тест №4. Ожидаю false, получаю - ', isWorkTime('14:00', '17:30', '08:0', 90)); // false
window.console.log('Тест №5. Ожидаю false, получаю - ', isWorkTime('8:00', '17:30', '08:00', 900)); // false
