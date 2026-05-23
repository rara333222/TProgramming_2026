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

// ЗАДАЧА А: сетка от 1.15 до 3.05 с шагом 0.38

console.log("Задача А");
console.log("x = 1.15 -> y =", y(1.15).toFixed(6));
console.log("x = 1.53 -> y =", y(1.53).toFixed(6));
console.log("x = 1.91 -> y =", y(1.91).toFixed(6));
console.log("x = 2.29 -> y =", y(2.29).toFixed(6));
console.log("x = 2.67 -> y =", y(2.67).toFixed(6));
console.log("x = 3.05 -> y =", y(3.05).toFixed(6));

// ЗАДАЧА Б: отдельные точки

console.log("\nЗадача Б");
console.log("x = 1.20 -> y =", y(1.20).toFixed(6));
console.log("x = 1.36 -> y =", y(1.36).toFixed(6));
console.log("x = 1.57 -> y =", y(1.57).toFixed(6));
console.log("x = 1.93 -> y =", y(1.93).toFixed(6));
console.log("x = 2.25 -> y =", y(2.25).toFixed(6));