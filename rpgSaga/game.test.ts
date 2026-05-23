import { describe, it, expect } from 'vitest';
import { Knight, Archer, Mage } from './chars';
import { fight, runRound} from './game';

describe("Базовый класс Hero", () => {
    it("takeDamage уменьшает здоровье, не ниже 0", () => {
        const h = new Knight("Тест", 100, 10);
        h.takeDamage(30);
        expect(h.getHp()).toBe(70);
        h.takeDamage(100);
        expect(h.getHp()).toBe(0);
        expect(h.isAlive()).toBe(false);
    });

});

describe("Рыцарь Knight", () => {
    it("Удар возмездия наносит 130% от силы", () => {
        const knight = new Knight("Артур", 100, 20);
        const target = new Knight("Цель", 100, 10);
        knight.useSkill(target);
        expect(target.getHp()).toBe(74);
    });
});

describe("Лучник Archer", () => {
    it("Огненные стрелы применяются один раз и не наносят урона", () => {
        const archer = new Archer("Леголас", 100, 10);
        const target = new Knight("Цель", 100, 10);
        archer.useSkill(target);
        expect(target.getHp()).toBe(100);
        target.burning();
        expect(target.getHp()).toBe(98);
        archer.useSkill(target);
        expect(target.getHp()).toBe(88);
    });
});

describe("Маг Mage", () => {
    it("Заворожение заставляет пропустить следующий ход", () => {
        const mage = new Mage("Гэндальф", 100, 5);
        const target = new Knight("Цель", 100, 10);
        mage.useSkill(target);
        expect(target.shouldSkipTurn()).toBe(true);
        expect(target.shouldSkipTurn()).toBe(false);
    });
});

describe("Бой fight", () => {
    it("сильный побеждает слабого", () => {
        const strong = new Knight("Силач", 100, 50);
        const weak = new Knight("Слабак", 30, 1);
        const winner = fight(strong, weak);
        expect(winner).toBe(strong);
        expect(weak.isAlive()).toBe(false);
        expect(strong.isAlive()).toBe(true);
    });
});

describe("Раунд runRound", () => {
    it("при нечётном числе игроков один проходит без боя", () => {
        const players = [
            new Knight("A", 100, 10),
            new Knight("B", 100, 10),
            new Knight("C", 100, 10)
        ];
        const winners = runRound(players);
        expect(winners.length).toBe(2);
        winners.forEach(w => expect(w.isAlive()).toBe(true));
    });
});