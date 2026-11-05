
import { GradeBook } from "../../src/grading.js";

describe("GradeBook Tests", () => {

    // Create a fresh GradeBook before every test
    let gradeBook;

    beforeEach(() => {
        gradeBook = new GradeBook(101);
    });

    // TEST 1: Empty gradebook average
    test("should return 0 for an empty gradebook average", () => {
        expect(gradeBook.getAverage()).toBe(0);
    });

    // TEST 2: Empty gradebook highest score
    test("should return null for highest score when empty", () => {
        expect(gradeBook.getHighestScore()).toBeNull();
    });

    // TEST 3: Single score
    test("should calculate the average of a single score", () => {
        gradeBook.addScore(80);

        expect(gradeBook.getAverage()).toBe(80);
        expect(gradeBook.getHighestScore()).toBe(80);
    });

    // TEST 4: Multiple scores
    test("should calculate the average of multiple scores", () => {
        gradeBook.addScore(80);
        gradeBook.addScore(90);
        gradeBook.addScore(70);

        expect(gradeBook.getAverage()).toBe(80);
        expect(gradeBook.getHighestScore()).toBe(90);
    });

    // TEST 5: Duplicate scores
    test("should handle duplicate scores correctly", () => {
        gradeBook.addScore(80);
        gradeBook.addScore(80);
        gradeBook.addScore(60);

        expect(gradeBook.getAverage()).toBeCloseTo(73.3333);
        expect(gradeBook.getHighestScore()).toBe(80);
    });

    // TEST 6: Boundary scores 0 and 100
    test("should accept scores of 0 and 100", () => {
        gradeBook.addScore(0);
        gradeBook.addScore(100);

        expect(gradeBook.scores).toEqual([0, 100]);
        expect(gradeBook.getAverage()).toBe(50);
    });

    // TEST 7: Independent GradeBook instances
    test("should maintain independent scores for different students", () => {
        const student1 = new GradeBook(101);
        const student2 = new GradeBook(102);

        student1.addScore(90);
        student2.addScore(60);

        expect(student1.getAverage()).toBe(90);
        expect(student2.getAverage()).toBe(60);

        expect(student1.scores).toEqual([90]);
        expect(student2.scores).toEqual([60]);
    });

    // TEST 8: Reject incorrect score types
    test.each([
        "80",
        null,
        undefined,
        {},
        []
    ])("should reject invalid score type: %p", (score) => {
        expect(() => gradeBook.addScore(score))
            .toThrow(TypeError);
    });

    // TEST 9: Reject scores outside the valid range
    test.each([
        -1,
        101,
        NaN,
        Infinity,
        -Infinity
    ])("should reject invalid score value: %p", (score) => {
        expect(() => gradeBook.addScore(score))
            .toThrow(RangeError);
    });

    // TEST 10: Remove the lowest score
    test("should remove and return the lowest score", () => {
        gradeBook.addScore(40);
        gradeBook.addScore(20);
        gradeBook.addScore(80);

        const removed = gradeBook.removeLowestScore();

        expect(removed).toBe(20);
        expect(gradeBook.scores).toEqual([40, 80]);
    });

    // TEST 11: Remove only one occurrence when scores are tied
    test("should remove only one occurrence of the lowest tied score", () => {
        gradeBook.addScore(20);
        gradeBook.addScore(20);
        gradeBook.addScore(40);
        gradeBook.addScore(80);

        const removed = gradeBook.removeLowestScore();

        expect(removed).toBe(20);
        expect(gradeBook.scores).toEqual([20, 40, 80]);
    });

    // TEST 12: Remove the only score
    test("should remove the lowest score when only one exists", () => {
        gradeBook.addScore(50);

        const removed = gradeBook.removeLowestScore();

        expect(removed).toBe(50);
        expect(gradeBook.scores).toEqual([]);
    });

    // TEST 13: Remove lowest score from an empty gradebook
    test("should return null when removing from an empty gradebook", () => {
        expect(gradeBook.removeLowestScore()).toBeNull();
    });

    // TEST 14: Passing boundary 49.99
    test("should fail when average is 49.99", () => {
        expect(GradeBook.isPassing(49.99)).toBe(false);
    });

    // TEST 15: Passing boundary 50
    test("should pass when average is exactly 50", () => {
        expect(GradeBook.isPassing(50)).toBe(true);
    });

    // TEST 16: Passing boundary 50.01
    test("should pass when average is 50.01", () => {
        expect(GradeBook.isPassing(50.01)).toBe(true);
    });

    // TEST 17: Fresh state for every test
    test("should start with an empty gradebook for each test", () => {
        expect(gradeBook.scores).toEqual([]);
    });

});
