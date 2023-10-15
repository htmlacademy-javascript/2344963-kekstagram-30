const lengthCheckString = (string, maxLength) => string.length <= maxLength;

// // Cтрока короче 20 символов
// console.log('Тест №1. Ожидаю true, получаю - ', lengthCheckString('проверяемая строка', 20)); // true
// // Длина строки ровно 18 символов
// console.log('Тест №2. Ожидаю true, получаю - ', lengthCheckString('проверяемая строка', 18)); // true
// // Строка длиннее 10 символов
// console.log('Тест №1. Ожидаю true, получаю - ', lengthCheckString('проверяемая строка', 10)); // false

const isPalindrome = (string) => {
  const preparedString = string.toLowerCase().replaceAll(' ', '');

  for (let i = 1; i <= preparedString.length; i++) {
    if (preparedString[i - 1] !== preparedString.at(-i)) {
      return false;
    }
  }

  return true;
};

// // Строка является палиндромом
// isPalindrome('топот'); // true
// // Несмотря на разный регистр, тоже палиндром
// isPalindrome('ДовОд'); // true
// // Это не палиндром
// isPalindrome('Кекс'); // false
// // Это палиндром
// isPalindrome('Лёша на полке клопа нашёл '); // true

const numberFromString = (string) => parseInt(string.toString().replace(/[^\d]/g, ''), 10);

// numberFromString('2023 год'); // 2023
// numberFromString('ECMAScript 2022'); // 2022
// numberFromString('1 кефир, 0.5 батона'); // 105
// numberFromString('агент 007'); // 7
// numberFromString('а я томат'); // NaN

// numberFromString(2023); // 2023
// numberFromString(-1); // 1
// numberFromString(1.5); // 15
