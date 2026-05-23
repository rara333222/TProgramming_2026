export const HeroType = {
    Knight: "Рыцарь",
    Archer: "Лучник",
    Mage: "Маг"
} as const;
export type HeroType = typeof HeroType[keyof typeof HeroType];

export class Hero {
    private _name: string;
    private _health: number;
    private _strength: number;
    private _type: HeroType;

    private _burnTurns: number;
    private _skipNextTurn: boolean;

    constructor(name: string, health: number, strength: number, type: HeroType) {
        this._name = name;
        this._health = health;
        this._strength = strength;
        this._type = type;
        this._burnTurns = 0;
        this._skipNextTurn = false;
    }

    getName(): string { return this._name; }
    getHealth(): number { return this._health; }
    getStrength(): number { return this._strength; }
    getType(): HeroType { return this._type; }
    
    isAlive(): boolean { return this._health > 0; }

    takeDamage(amount: number): void {
        this._health -= amount;
        if (this._health < 0) this._health = 0;
    }

    attack(target: Hero, logger: (msg: string) => void): void {
        logger(this._name + " (" + this._type + ") наносит урон " + this._strength + " противнику " + target.getName());
        target.takeDamage(this._strength);
    }

    useAbility(target: Hero, logger: (msg: string) => void): void {
        this.attack(target, logger);
    }

    processEffects(logger: (msg: string) => void): void {
        if (this._burnTurns > 0) {
            logger(this._name + " горит и теряет 2 здоровья");
            this.takeDamage(2);
            this._burnTurns--;
        }
    }

    shouldSkipTurn(): boolean {
        if (this._skipNextTurn) {
            this._skipNextTurn = false;
            return true;
        }
        return false;
    }

    applyBurn(turns: number): void {
        if (turns > this._burnTurns) this._burnTurns = turns;
    }

    applySkipTurn(): void {
        this._skipNextTurn = true;
    }

    takeTurn(target: Hero, logger: (msg: string) => void, abilityChance: number): void {
        this.processEffects(logger);
        if (!this.isAlive()) return;
        if (this.shouldSkipTurn()) {
            logger(this._name + " пропускает ход из-за заворожения");
            return;
        }
        if (Math.random() < abilityChance) {
            this.useAbility(target, logger);
        } else {
            this.attack(target, logger);
        }
    }
}

export class Knight extends Hero {

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength, HeroType.Knight);
    }

    useAbility(target: Hero, logger: (msg: string) => void): void {
        var bonus = Math.floor(this.getStrength() * 0.3);
        var damage = this.getStrength() + bonus;
        logger(this.getName() + " (" + this.getType() + ") использует Удар возмездия и наносит урон " + damage + " противнику " + target.getName());
        target.takeDamage(damage);
    }
}

export class Archer extends Hero {

    private _usedFireArrows: boolean;

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength, HeroType.Archer);
        this._usedFireArrows = false;
    }

    useAbility(target: Hero, logger: (msg: string) => void): void {
        if (!this._usedFireArrows) {
            this._usedFireArrows = true;
            logger(this.getName() + " (" + this.getType() + ") использует Огненные стрелы! " + target.getName() + " загорается на 2 хода");
            target.applyBurn(2);
        } else {
            this.attack(target, logger);
        }
    }
}

export class Mage extends Hero {

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength, HeroType.Mage);
    }
    
    useAbility(target: Hero, logger: (msg: string) => void): void {
        logger(this.getName() + " (" + this.getType() + ") использует Заворожение! " + target.getName() + " пропустит следующий ход");
        target.applySkipTurn();
    }
}

export function createHero(type: HeroType, name: string, health: number, strength: number): Hero {
    if (type === HeroType.Knight) return new Knight(name, health, strength);
    if (type === HeroType.Archer) return new Archer(name, health, strength);
    if (type === HeroType.Mage) return new Mage(name, health, strength);
    throw new Error("Неизвестный тип героя");
}