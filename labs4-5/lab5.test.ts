import { describe, expect, it } from "vitest";
import { Country } from "./lab5";

describe("Тесты для структуры Country", () => {
    it("фабричный метод create создаёт корректный объект", () => {
        const c = Country.create("Тест", 10, 20);
        expect(c.name).toBe("Тест");
        expect(c.population).toBe(10);
        expect(c.area).toBe(20);
    });

    it("метод getDensity возвращает строку с числом", () => {
        const c = Country.create("Плотность", 5, 2);
        const densityStr = c.getDensity();
        expect(densityStr).toContain("2500");
    });

    it("метод compareS корректно сравнивает площади", () => {
        const big = Country.create("Большая", 100, 50);
        const small = Country.create("Маленькая", 1, 10);
        const eq1 = Country.create("A", 10, 30);
        const eq2 = Country.create("B", 20, 30);

        expect(big.compareS(small)).toBe("Площадь Большая больше чем у Маленькая на 40");
        expect(small.compareS(big)).toBe("Площадь Большая больше чем у Маленькая на 40");
        expect(eq1.compareS(eq2)).toBe("Площади стран равны");
    });

    it("метод getInfo возвращает строку с данными", () => {
        const c = Country.create("Тест", 5, 2);
        const info = c.getInfo();
        expect(info).toContain("Тест");
        expect(info).toContain("население 5 млн");
        expect(info).toContain("площадь 2 тыс. км²");
        expect(info).toContain("плотность 2500.0 чел/км²");
    });
});