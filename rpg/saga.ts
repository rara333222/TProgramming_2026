import { Hero, HeroType, createHero } from './chars';

var NAMES: string[] = [
    "Артур", "Эльдар", "Гэндальф", "Вильямс", "Ланселот", "Леголас",
    "Мерлин", "Торин", "Арагорн", "Гимли", "Фродо", "Боромир"
];

function randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomHero(): Hero {
    var name = randomItem(NAMES);
    var health = randomRange(50, 150);
    var strength = randomRange(5, 20);
    var type = randomItem([HeroType.Knight, HeroType.Archer, HeroType.Mage]);
    return createHero(type, name, health, strength);
}

export function generateHeroes(count: number): Hero[] {
    if (count % 2 !== 0) {
        throw new Error("Количество героев должно быть чётным");
    }
    var heroes: Hero[] = [];
    for (var i = 0; i < count; i++) {
        heroes.push(generateRandomHero());
    }
    return heroes;
}

function defaultLogger(message: string): void {
    console.log(message);
}

export function fight(hero1: Hero, hero2: Hero, logger: (msg: string) => void = defaultLogger): Hero {
    logger("\n⚔️  БОЙ: " + hero1.getName() + " (" + hero1.getType() + ") vs " + hero2.getName() + " (" + hero2.getType() + ")");
    
    var current = hero1;
    var opponent = hero2;

    if (Math.random() < 0.5) {
        current = hero2;
        opponent = hero1;
        logger("   " + current.getName() + " ходит первым.");
    }

    while (hero1.isAlive() && hero2.isAlive()) {
        current.takeTurn(opponent, logger, 0.3);
        if (!opponent.isAlive()) {
            logger("   ☠️ " + opponent.getName() + " погибает!");
            break;
        }
        var temp = current;
        current = opponent;
        opponent = temp;
    }

    var winner = hero1.isAlive() ? hero1 : hero2;
    logger("   🏆 Победитель: " + winner.getName() + " (" + winner.getType() + ")\n");
    return winner;
}

export function runRound(players: Hero[], logger: (msg: string) => void = defaultLogger): Hero[] {
    var winners: Hero[] = [];
    var shuffled = players.slice();
    // Перемешиваем
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    // Составляем пары, обрабатывая возможный нечётный остаток
    var i = 0;
    while (i + 1 < shuffled.length) {
        var winner = fight(shuffled[i], shuffled[i + 1], logger);
        winners.push(winner);
        i += 2;
    }
    if (i < shuffled.length) {
        logger("   " + shuffled[i].getName() + " проходит в следующий раунд без боя");
        winners.push(shuffled[i]);
    }
    return winners;
}

export class Game {
    private heroes: Hero[];
    private logger: (msg: string) => void;

    constructor(heroes: Hero[], loggerFn: (msg: string) => void = defaultLogger) {
        this.heroes = heroes;
        this.logger = loggerFn;
    }

    start(): void {
        this.logger("=== НАЧАЛО ТУРНИРА ===");
        var round = 1;
        var currentPlayers = this.heroes.slice();

        while (currentPlayers.length > 1) {
            this.logger("\n===== РАУНД " + round + " =====");
            currentPlayers = runRound(currentPlayers, this.logger);
            round++;
        }

        var champion = currentPlayers[0];
        this.logger("\n✨ ПОБЕДИТЕЛЬ ТУРНИРА: " + champion.getName() + " (" + champion.getType() + ") ✨");
    }
}