// Вариант 16. Структура "Страна"

class Country {
    name: string;
    population: number;  // в миллионах
    area: number;        // в тысячах км2

    constructor(name: string, population: number, area: number) {
        this.name = name;
        this.population = population;
        this.area = area;
    }

    // метод конструктор, возвращающий структуру
    static create(name: string, population: number, area: number): Country {
        return new Country(name, population, area);
    }

    // получить плотность населения
    getDensity(): number {
    return (this.population * 1_000_000) / (this.area * 1000);
    }

    // сравнение по площади
    compareS(other: Country): string {
        if (this.area > other.area) {
            return `Площадь ${this.name} больше чем у ${other.name} на ${this.area - other.area}`;
        } else if (this.area < other.area) {
            return `Площадь ${other.name} больше чем у ${this.name} на ${other.area - this.area}`;
        } else { return `Площади стран равны`}     
    }

    // получить информацию
    getInfo(): string {
        return `${this.name}: население ${this.population} млн, площадь ${this.area} тыс. км², плотность ${this.getDensity().toFixed(1)} чел/км²`;
    }
}

// Тесты
console.log("\nЗапуск тестов структуры 'Страна'\n");

let testFailed = false;

function testFactoryMethod(): void {
    const country = Country.create("Фабричная", 5, 10);   // используем фабричный метод
    if (country.name === "Фабричная" && country.population === 5 && country.area === 10) {
        console.log("testFactoryMethod: фабричный метод создаёт корректный объект");
    } else {
        console.log("Ошибка: фабричный метод работает неверно");
        testFailed = true;
    }
}

function testDensity(): void {
    const country = Country.create("Плотностная", 5, 2);
    const density = country.getDensity();
    if (Math.abs(density - 2500) < 0.001) {
        console.log("testDensity: плотность вычислена верно (2500 чел/км²)");
    } else {
        console.log(`Ошибка: ожидалась плотность 2500, получено ${density}`);
        testFailed = true;
    }
}

function testComparison(): void {
    const big = Country.create("Большая", 100, 50);
    const small = Country.create("Маленькая", 1, 10);
    const eq1 = Country.create("Страна1", 10, 30);
    const eq2 = Country.create("Страна2", 20, 30);

    console.log(big.compareS(small));
    console.log(small.compareS(big));
    console.log(eq1.compareS(eq2));

    // Если хотя бы один вызов вернул пустую строку или undefined
    if (!big.compareS(small) || !small.compareS(big) || !eq1.compareS(eq2)) {
        console.log("Ошибка: метод compareS вернул некорректное значение");
        testFailed = true;
    }
}

// Запуск тестов
testFactoryMethod();
if (testFailed) throw new Error("Тест конструктора структур не пройден");
testDensity();
if (testFailed) throw new Error("Тест плотности не пройден");
testComparison();
if (testFailed) throw new Error("Тест сравнения не пройден");

if (!testFailed) {
    console.log("\nВсе тесты пройдены успешно!");
}

// Проверка программы
console.log("\nРабота со структурой 'Страна'\n");

const country1 = Country.create("Россия", 146, 17125);
const country2 = Country.create("Франция", 68, 551);
const country3 = Country.create("Монако", 0.039, 2.02);

console.log(country1.getInfo());
console.log(country2.getInfo());
console.log(country3.getInfo());

console.log(country1.compareS(country3));
console.log(country3.compareS(country2));

console.log(`Плотность населения страны ${country2.name} = ${country2.getDensity()}`);