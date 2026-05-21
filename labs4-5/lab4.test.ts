import { describe, expect, it } from "vitest";
import { y } from "./lab4";

describe("Тесты для функции y(x)", () => {
    it("должна возвращать число (не NaN, не бесконечность) для всех x из задания", () => {
        const testPoints = [1.15, 1.53, 1.91, 2.29, 2.67, 3.05, 1.20, 1.36, 1.57, 1.93, 2.25];
        for (const x of testPoints) {
            const result = y(x);
            expect(isNaN(result)).toBe(false);
            expect(isFinite(result)).toBe(true);
        }
    });

    it("должна давать одинаковый результат при повторных вызовах", () => {
        const x = 2.0;
        const first = y(x);
        const second = y(x);
        expect(first).toBe(second);
    });

    it("должна совпадать с ранее полученными значениями", () => {
        expect(y(1.20)).toBeCloseTo(-0.015511, 5);
        expect(y(1.36)).toBeCloseTo(0.504493, 5);
        expect(y(1.57)).toBeCloseTo(-0.000223, 5);
        expect(y(1.93)).toBeCloseTo(-0.664129, 5);
        expect(y(2.25)).toBeCloseTo(-0.194618, 5);
    });
});