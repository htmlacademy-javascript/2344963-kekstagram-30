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
