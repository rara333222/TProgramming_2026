import { Hero, createHero } from './chars';

let NAMES: string[] = [
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
    let name = randomItem(NAMES);
    let hp = randomRange(50, 150);
    let strength = randomRange(5, 20);
    let type = randomItem(["Рыцарь", "Лучник", "Маг"]);
    return createHero(type, name, hp, strength);
}

function generateHeroes(count: number): Hero[] {
    if (count % 2 !== 0) {
        throw new Error("Количество героев должно быть чётным");
    }
    let heroes: Hero[] = [];
    for (let i = 0; i < count; i++) {
        heroes.push(generateRandomHero());
    }
    return heroes;
}

export function fight(hero1: Hero, hero2: Hero): Hero {
    console.log(`\n⚔️  НАЧАЛСЯ БОЙ: ${hero1.getName()} (${hero1.getType()}) vs ${hero2.getName()} (${hero2.getType()})`);
    
    let current = hero1;
    let opponent = hero2;

    if (Math.random() < 0.5) {
        current = hero2;
        opponent = hero1;
        console.log(`${current.getName()} ходит первым.`);
    }

    while (hero1.isAlive() && hero2.isAlive()) {
        current.takeTurn(opponent, 0.3);
        if (!opponent.isAlive()) {
            console.log(` ☠️ ${opponent.getName()} погибает!`);
            break;
        }
        let temp = current;
        current = opponent;
        opponent = temp;
    }

    let winner = hero1.isAlive() ? hero1 : hero2;
    hero1.neBurn();
    hero2.neBurn();
    console.log(` 🏆 Победитель: ${winner.getName()} (${winner.getType()})\n`);
    return winner;
}

export function runRound(players: Hero[]): Hero[] {
    let winners: Hero[] = [];
    let shuffled = players.slice();
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    let i = 0;
    while (i + 1 < shuffled.length) {
        let winner = fight(shuffled[i], shuffled[i + 1]);
        winners.push(winner);
        i += 2;
    }
    if (i < shuffled.length) {
        console.log(`   ${shuffled[i].getName()} проходит в следующий раунд без боя`);
        winners.push(shuffled[i]);
    }
    return winners;
}

class Game {
    private heroes: Hero[];

    constructor(heroes: Hero[]) { this.heroes = heroes; }

    start(): void {
        console.log("=== НАЧАЛО ТУРНИРА ===");
        let round = 1;
        let currentPlayers = this.heroes.slice();

        while (currentPlayers.length > 1) {
            console.log(`\n===== РАУНД ${round} =====`);
            currentPlayers = runRound(currentPlayers);
            round++;
        }

        let champ = currentPlayers[0];
        console.log(`\n✨ ПОБЕДИТЕЛЬ ТУРНИРА: ${champ.getName()} (${champ.getType()}) ✨`);
    }
}


// Начало игры
let heroes = generateHeroes(6);
console.log("\n--- СОЗДАННЫЕ ГЕРОИ ---");
for (let i = 0; i < heroes.length; i++) {
    let h = heroes[i];
    console.log(`${h.getName()} (${h.getType()}) | здоровье: ${h.getHp()} | сила: ${h.getStrength()}`);
}
let game = new Game(heroes);
game.start();
