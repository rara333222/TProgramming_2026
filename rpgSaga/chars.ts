export class Hero {
    private _name: string;
    private _hp: number;
    private _strength: number;
    private _type: string;

    private _burns: boolean;
    private _skipNextTurn: boolean;

    constructor(name: string, health: number, strength: number, type: string) {
        this._name = name;
        this._hp = health;
        this._strength = strength;
        this._type = type;
        this._burns = false;
        this._skipNextTurn = false;
    }

    getName(): string { return this._name; }
    getHp(): number { return this._hp; }
    getStrength(): number { return this._strength; }
    getType(): string { return this._type; }

    neBurn(): void { this._burns = false }
    
    isAlive(): boolean { return this._hp > 0; }

    takeDamage(amount: number): void {
        this._hp -= amount;
        if (this._hp < 0) this._hp = 0;
    }

    attack(target: Hero): void {
        console.log(`${this._name} (${this._type}) наносит урон ${this._strength} противнику ${target.getName()}`);
        target.takeDamage(this._strength);
    }

    useSkill(target: Hero): void {
        this.attack(target);
    }

    burning(): void {
        if (this._burns) {
            console.log(`${this._name} горит и теряет 2 здоровья`);
            this.takeDamage(2);
        }
    }

    shouldSkipTurn(): boolean {
        if (this._skipNextTurn) {
            this._skipNextTurn = false;
            return true;
        }
        return false;
    }

    applyBurn(): void {
        this._burns = true;
    }

    applySkipTurn(): void {
        this._skipNextTurn = true;
    }

    takeTurn(target: Hero, abilityChance: number): void {
        this.burning();
        if (!this.isAlive()) return;
        if (this.shouldSkipTurn()) {
            console.log(`${this._name} пропускает ход из-за заворожения`);
            return;
        }
        if (Math.random() < abilityChance) {
            this.useSkill(target);
        } else {
            this.attack(target);
        }
    }
}

export class Knight extends Hero {
    constructor(name: string, hp: number, strength: number) {
        super(name, hp, strength, "Рыцарь");
    }

    useSkill(target: Hero): void {
        let damage = Number(((this.getStrength() * 0.3)+this.getStrength()).toFixed(1));
        console.log(`${this.getName()} (${this.getType()}) использует Удар возмездия и наносит урон ${damage} противнику ${target.getName()}`);
        target.takeDamage(damage);
    }
}

export class Archer extends Hero {
    private _usedFire: boolean;

    constructor(name: string, hp: number, strength: number) {
        super(name, hp, strength, "Лучник");
        this._usedFire = false;
    }

    useSkill(target: Hero): void {
        if (!this._usedFire) {
            this._usedFire = true;
            console.log(`${this.getName()} (${this.getType()}) использует Огненные стрелы на ${target.getName()}`);
            target.applyBurn();
        } else {
            this.attack(target);
        }
    }
}

export class Mage extends Hero {
    constructor(name: string, hp: number, strength: number) {
        super(name, hp, strength, "Маг");
    }
    
    useSkill(target: Hero): void {
        console.log(`${this.getName()} (${this.getType()}) использует Заворожение на ${target.getName()}`);
        target.applySkipTurn();
    }
}

export function createHero(type: string, name: string, hp: number, strength: number): Hero {
    if (type === "Рыцарь") return new Knight(name, hp, strength);
    if (type === "Лучник") return new Archer(name, hp, strength);
    if (type === "Маг") return new Mage(name, hp, strength);
    throw new Error("Неизвестный тип героя");
}