import { generateHeroes, Game } from './saga';

var numberOfPlayers = 6;

try {
    var heroes = generateHeroes(numberOfPlayers);
    console.log("\n--- СОЗДАННЫЕ ГЕРОИ ---");
    for (var i = 0; i < heroes.length; i++) {
        var h = heroes[i];
        console.log(h.getName() + " (" + h.getType() + ") | здоровье: " + h.getHealth() + " | сила: " + h.getStrength());
    }
    var game = new Game(heroes);
    game.start();
} catch (err) {
    console.log("Ошибка: " + err);
}