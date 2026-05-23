import { describe, it, expect } from 'vitest';
import { Knight, Archer, Mage, HeroType, createHero } from './chars';
import { fight, generateHeroes, runRound } from './saga';

describe("Рыцарь", () => {
    it("Удар возмездия наносит +30% урона", () => {
        const knight = new Knight("Артур", 100, 20);
        const target = new Knight("Цель", 100, 10);
        knight.useAbility(target, () => {});
        // урон: 20 + 30% = 26
        expect(target.getHealth()).toBe(74);
    });
});

describe("Лучник", () => {
    it("Огненные стрелы поджигают цель (1 раз за бой)", () => {
        const archer = new Archer("Леголас", 100, 10);
        const target = new Knight("Цель", 100, 10);
        archer.useAbility(target, () => {});
        expect(target.getHealth()).toBe(100); // мгновенного урона нет
        // горение должно сработать в начале хода цели
        target.processEffects(() => {});
        expect(target.getHealth()).toBe(98);
        // второе использование способности – обычная атака
        archer.useAbility(target, () => {});
        expect(target.getHealth()).toBe(88);
    });
});

describe("Маг", () => {
    it("Заворожение заставляет пропустить следующий ход", () => {
        const mage = new Mage("Гэндальф", 100, 5);
        const target = new Knight("Цель", 100, 10);
        mage.useAbility(target, () => {});
        expect(target.shouldSkipTurn()).toBe(true);
        // после проверки флаг сбрасывается
        expect(target.shouldSkipTurn()).toBe(false);
    });
});

describe("Фабрика createHero", () => {
    it("создаёт героя нужного типа", () => {
        expect(createHero(HeroType.Knight, "А", 100, 10)).toBeInstanceOf(Knight);
        expect(createHero(HeroType.Archer, "Б", 100, 10)).toBeInstanceOf(Archer);
        expect(createHero(HeroType.Mage, "В", 100, 10)).toBeInstanceOf(Mage);
    });
});

describe("Генерация героев", () => {
    it("generateHeroes выдаёт чётное количество", () => {
        const heroes = generateHeroes(4);
        expect(heroes.length).toBe(4);
        expect(heroes[0].getHealth()).toBeGreaterThan(0);
    });

});

describe("Бой", () => {
    it("маг может заворожить и пропустить ход противника", () => {
        const mage = new Mage("Маг", 100, 10);
        const warrior = new Knight("Воин", 50, 20);
        // имитируем бой: маг использует способность, воин пропускает ход
        mage.useAbility(warrior, () => {});
        expect(warrior.shouldSkipTurn()).toBe(true);
        warrior.processEffects(() => {});
        expect(warrior.shouldSkipTurn()).toBe(false);
    });
});

describe("Раунд", () => {
    it("при нечётном числе игроков один проходит без боя (количество победителей увеличивается)", () => {
        const players = [
            new Knight("A", 100, 10),
            new Knight("B", 100, 10),
            new Knight("C", 100, 10)
        ];
        // функция runRound возвращает список победителей; при нечётном числе игроков
        // один игрок остаётся без пары и проходит дальше
        const winners = runRound(players, () => {});
        expect(winners.length).toBe(2); // один бой + один без боя
        for (const w of winners) {
            expect(w.isAlive()).toBe(true);
        }
    });
});