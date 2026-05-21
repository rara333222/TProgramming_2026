// Вариант 16. Структура "Страна"

export class Country {
    name: string;
    population: number;  // в миллионах
    area: number;        // в тысячах км²

    constructor(name: string, population: number, area: number) {
        this.name = name;
        this.population = population;
        this.area = area;
    }

    // метод конструктор возвращающий структуры
    static create(name: string, population: number, area: number): Country {
        return new Country(name, population, area);
    }

    getDensity(): string {    
        return `Население страны ${this.name} = ${(this.population * 1_000_000) / (this.area * 1000)}`;
    }

    compareS(other: Country): string {
        if (this.area > other.area) {
            return `Площадь ${this.name} больше чем у ${other.name} на ${this.area - other.area}`;
        } else if (this.area < other.area) {
            return `Площадь ${other.name} больше чем у ${this.name} на ${other.area - this.area}`;
        } else {
            return `Площади стран равны`;
        }
    }

    getInfo(): string {
        const density = (this.population * 1_000_000) / (this.area * 1000);
        return `${this.name}: население ${this.population} млн, площадь ${this.area} тыс. км², плотность ${density.toFixed(1)} чел/км²`;
    }
}

console.log("\nРабота со структурой 'Страна'\n");
const country1 = Country.create("Россия", 146, 17125);
const country2 = Country.create("Франция", 68, 551);
const country3 = Country.create("Монако", 0.039, 2.02);

console.log(country1.getInfo());
console.log(country2.getInfo());
console.log(country3.getInfo());

console.log(country1.compareS(country3));
console.log(country3.compareS(country2));
console.log(country2.getDensity());