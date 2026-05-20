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

// ЗАДАЧА А
console.log("Задача А");

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