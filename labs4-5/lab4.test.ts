// lab4.test.ts
import { describe, it, expect } from 'vitest';
import { taskA, taskB } from './lab4';

describe("taskA", () => {
    it("конкретные значения для a=2.5, b=4.6 совпадают с эталонными", () => {
        const res = taskA(2.5, 4.6);
        const expected = [
            -0.033684, -0.006773, -0.450198,
             0.649327,  0.212599, -0.568636
        ];
        for (let i = 0; i < res.y.length; i++) {
            expect(res.y[i]).toBeCloseTo(expected[i], 5);
        }
    });

    it("для a=4.3, b=2 значения y для сетки x", () => {
        const res = taskA(4.3, 2);
        const expected = [
            -0.184882,  // x=1.15
             0.477898,  // x=1.53
            -0.576303,  // x=1.91
             0.363009,  // x=2.29
            -0.582129,  // x=2.67
             0.537655   // x=3.05
        ];
        for (let i = 0; i < res.y.length; i++) {
            expect(res.y[i]).toBeCloseTo(expected[i], 5);
        }
    });

    it("для a=0, b=1 значения y для сетки x: 1.15,1.53,1.91,2.29,2.67,3.05", () => {
        const res = taskA(0, 1);
        const expected = [
            0.499555,
            -0.484338,
            -0.103826,
            -0.323453,
            -0.161599,
            -0.347737
        ];
        for (let i = 0; i < res.y.length; i++) {
            expect(res.y[i]).toBeCloseTo(expected[i], 5);
        }
    });
});

describe("taskB", () => {
    it("конкретные значения для a=2.5, b=4.6 совпадают с эталонными", () => {
        const res = taskB(2.5, 4.6);
        const expected = [-0.015511, 0.504493, -0.000223, -0.664129, -0.194618];
        for (let i = 0; i < res.y.length; i++) {
            expect(res.y[i]).toBeCloseTo(expected[i], 5);
        }
    });

    it("для a=5.6, b=2.4", () => {
        const res = taskB(5.6, 2.4);
        const expected = [
            -0.433125,  // x=1.20
            0.031063, // x=1.36
            0.067677,  // x=1.57
            0.507187, // x=1.93
            -0.312656   // x=2.25
        ];
        for (let i = 0; i < res.y.length; i++) {
            expect(res.y[i]).toBeCloseTo(expected[i], 5);
        }
    });

    it("для a=4.3, b=2", () => {
        const res = taskB(4.3, 2);
        const expected = [
            -0.341082,  // x=1.20
            -0.407733, // x=1.36
            -0.595643,  // x=1.57
            0.085574, // x=1.93
            -0.629891   // x=2.25
        ];
        for (let i = 0; i < res.y.length; i++) {
            expect(res.y[i]).toBeCloseTo(expected[i], 5);
        }
    });
});