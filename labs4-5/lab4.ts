// Вариант 28

// Функция y(x) = sin((a+b*x)^3.5) / (1 + cos(lg(a+b*x)))
export function y(a: number, b: number, x: number): number {
    const AplusBX = a + b * x;
    const power = Math.pow(AplusBX, 3.5);
    const verh = Math.sin(power);
    const niz = 1 + Math.cos(Math.log10(AplusBX));
    return verh / niz;
}

//Задача А
export function taskA(a: number, b: number): { x: number[]; y: number[] } {
    const xStart = 1.15;
    const xEnd = 3.05;
    const step = 0.38;
    const n = Math.floor((xEnd - xStart) / step) + 1;

    const xArr: number[] = new Array(n);
    const yArr: number[] = new Array(n);

    for (let i = 0; i < n; i++) {
        const x = xStart + i * step;
        xArr[i] = x;
        yArr[i] = y(a, b, x);
    }
    return { x: xArr, y: yArr };
}

// Задача Б
export function taskB(a: number, b: number): { x: number[]; y: number[] } {
    const xPoints: number[] = [1.20, 1.36, 1.57, 1.93, 2.25];
    const m = xPoints.length;
    const xArr: number[] = new Array(m);
    const yArr: number[] = new Array(m);

    for (let i = 0; i < m; i++) {
        xArr[i] = xPoints[i];
        yArr[i] = y(a, b, xPoints[i]);
    }
    return { x: xArr, y: yArr };
}


// Проверка на табличных значениях
console.log("Задача А");
    const resA = taskA(2.5, 4.6);
    for (let i = 0; i < resA.x.length; i++) {
        console.log(`x = ${resA.x[i].toFixed(3)} -> y = ${resA.y[i].toFixed(6)}`);
    }

console.log("\nЗадача Б");
    const resB = taskB(2.5, 4.6);
    for (let i = 0; i < resB.x.length; i++) {
        console.log(`x = ${resB.x[i].toFixed(2)} -> y = ${resB.y[i].toFixed(6)}`);
    }
