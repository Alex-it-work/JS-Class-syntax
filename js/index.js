"use strict";
// 1) Переписать функцию-конструктор MyArray на классы. *Переписать методы unshift, push для неограниченного числа аргументов.
class MyArray {
  constructor() {
    this.length = 0;
  }

  pop() {
    if (this.length === 0) {
      return;
    }
    const lastItem = this[this.length - 1];
    delete this[--this.length];
    return lastItem;
  }
  push() {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length] = arguments[i];
      ++this.length;
    }
    return this.length;
  }
  // пробовал рекурсией, понял ,что в функции обертки рекурсию не сделать, а без обертки нужна внешняя переменная
  // push() {
  //   let count = 0;
  //   rec(arguments);
  //   function rec(arr) {
  //     if (count === arr.length - 1) {
  //       this.length++;
  //       this[this.length] = arr[count];
  //       return;
  //     }
  //     this.length++;
  //     this[this.length] = arr[count];
  //     count++;
  //     return rec(arr);
  //   }
  //   return this.length;
  // }

  shift() {
    if (this.length === 0) {
      return;
    }
    const fistItem = this[0];
    for (let i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1];
    }
    delete this[--this.length];
    return fistItem;
  }

  unshift() {
    this.length += arguments.length;
    for (let i = this.length - 1; i >= 0; i--) {
      this[i] = this[i - arguments.length];
    }
    for (let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    // как лучше для больших обьемов, сделать 2 цикла либо 1 цикл с условным оператором и т д
    // на первый взгляд 2 цикла так быстрее
    return this.length;
  }

  filter(callback) {
    const returningArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        returningArray.push(this[i]);
      }
    }
    return returningArray;
  }
}
const arr = new MyArray();
arr.push(1, 2, 3);
console.table(arr);
arr.unshift(3, 2, 1, 0);
console.table(arr);

// 2) Реализовать класс RangeValidator, со следующими свойствами:
// ■ from (number);
// ■ to (number);
// Реализовать getter'ы и setter'ы для обоих свойств
// Реализовать getter range, который будет возвращать массив с двумя числами диапазона
// Реализовать метод validate, который будет принимать число и проверить входит ли число в указанный диапазон.

class RangeValidator {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  get targetFromTo() {
    return `${this.from} - ${this.to}`;
  }

  get range() {
    return [this.from, this.to];
  }

  get getValueFrom() {
    return this.from;
  }

  get getValueTo() {
    return this.to;
  }

  set setFrom(value) {
    if (typeof value !== "number" || !Number.isSafeInteger(value)) {
      throw new TypeError('"From" - must be an integer number');
    }
    this.from = value;
  }

  set setTo(value) {
    if (typeof value !== "number" || !Number.isSafeInteger(value)) {
      throw new TypeError('"To" - must be an integer number');
    }
    this.to = value;
  }

  validate(incomingValue) {
    if (
      typeof incomingValue !== "number" ||
      !Number.isSafeInteger(incomingValue)
    ) {
      throw new TypeError('"incomingValue" - must be an integer number');
    }
    if (
      this.from <= this.to &&
      incomingValue >= this.from &&
      incomingValue <= this.to
    ) {
      return true;
    } else if (incomingValue <= this.from && incomingValue >= this.to) {
      return true;
    }
    return false;
  }
}

const myRangeValidator = new RangeValidator(15, 20);
console.log(
  "myRangeValidator.targetFromTo :>> ",
  myRangeValidator.targetFromTo
);

try {
  myRangeValidator.setFrom = 10;
  myRangeValidator.setTo = 15;
} catch (e) {
  if (e instanceof TypeError) {
    alert("Value must be an integer number");
  }
}

console.log(
  "myRangeValidator.targetFromTo :>> ",
  myRangeValidator.targetFromTo
);

try {
  console.log(
    "myRangeValidator.validate(11) :>> ",
    myRangeValidator.validate(11)
  );
  console.log(
    "myRangeValidator.validate(16) :>> ",
    myRangeValidator.validate(16)
  );
} catch (e) {
  if (e instanceof TypeError) {
    alert("Value must be an integer number");
  }
}
