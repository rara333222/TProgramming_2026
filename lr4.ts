// Вариант 28
const a: number = 2.5;
const b: number = 4.6;

// Функция y(x) = sin((a+b*x)^3.5) / (1 + cos(lg(a+b*x)))
function y(x: number): number {
    const AplusBX = a + b * x;
    const power = Math.pow(AplusBX, 3.5);
    const verh = Math.sin(power);
    const niz = 1 + Math.cos(Math.log10(AplusBX));
    return verh / niz;
}

// Тесты
console.log("\nЗапускаем тесты\n");
let errFlag: boolean = false;

// 1. Проверка области определения (аргумент логарифма > 0)
function testDomain(x: number): void {
    const arg = a + b * x;
    if (arg <= 0) {
        console.log(`Ошибка: для x=${x} аргумент логарифма = ${arg} (должен быть > 0)`);
        errFlag = true;
    } else {
        console.log(`x=${x}: аргумент логарифма = ${arg.toFixed(3)} > 0`);
    }
}

// 2. Проверка, что результат y(x) — не NaN и не бесконечность
function testYisFinite(x: number): void {
    const res = y(x);
    if (isNaN(res)) {
        console.log(`Ошибка: y(${x}) = NaN`);
        errFlag = true;
    } else if (!isFinite(res)) {
        console.log(`Ошибка: y(${x}) = бесконечность`);
        errFlag = true;
    } else {
        console.log(`y(${x}) = ${res.toFixed(6)} (является числом)`);
    }
}

// 3. Проверка на одинаковый результат при повторном вызове
function testSameRes(x: number): void {
    const first = y(x);
    const second = y(x);
    if (first === second) {
        console.log(`y(${x}) повторно даёт ${first.toFixed(6)}`);
    } else {
        console.log(`Ошибка: при x=${x} результаты не совпадают: ${first} vs ${second}`);
        errFlag = true;
    }
}

// Запускаем тесты на нескольких значениях
const somePoints: number[] = [1.15, 1.5, 2.0, 2.5, 3.0];
for (let i = 0; i < somePoints.length; i++) {
    testDomain(somePoints[i]);
    if (errFlag) break;
    testYisFinite(somePoints[i]);
    if (errFlag) break;
    testSameRes(somePoints[i]);
    if (errFlag) break;
}

if (errFlag) {
    console.log("\nТесты не пройдены. Выполнение программы прервано.");
    throw new Error("Ошибка в тестах");
}
console.log("\nТесты успешно пройдены.");

// ЗАДАЧА А
console.log("\nЗадача А");

const xStart: number = 1.15;
const xEnd: number = 3.05;
const step: number = 0.38;
const n: number = 6; // (3.05 - 1.15)/0.38 + 1 = 6

const xArrayA: number[] = new Array(n);
const yArrayA: number[] = new Array(n);

for (let i: number = 0; i < n; i++) {
    const x: number = xStart + i * step;
    xArrayA[i] = x;
    yArrayA[i] = y(x);
}

for (let i: number = 0; i < n; i++) {
    console.log(`x = ${xArrayA[i].toFixed(3)} -> y = ${yArrayA[i].toFixed(6)}`);
}

// ЗАДАЧА Б
console.log("\nЗадача Б");

const xArrayB: number[] = [1.20, 1.36, 1.57, 1.93, 2.25];
const m: number = xArrayB.length;
const yArrayB: number[] = new Array(m);

for (let i: number = 0; i < m; i++) {
    yArrayB[i] = y(xArrayB[i]);
}

for (let i: number = 0; i < m; i++) {
    console.log(`x = ${xArrayB[i].toFixed(2)} -> y = ${yArrayB[i].toFixed(6)}`);
}