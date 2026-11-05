
import * as tuition from "../../src/tuition.js";

const { calculateTuition } = tuition;

describe("Tuition Calculation Tests", () => {

    const validCourse = {
        creditHours: 3,
        pricePerCredit: 100
    };

    // TEST 1: No courses
    test("should return zero tuition when there are no courses", () => {
        expect(calculateTuition([])).toEqual({
            subtotal: 0,
            discount: 0,
            payable: 0
        });
    });

    // TEST 2: One course
    test("should calculate tuition for one course", () => {
        const courses = [validCourse];

        expect(calculateTuition(courses, 0.2)).toEqual({
            subtotal: 300,
            discount: 60,
            payable: 240
        });
    });

    // TEST 3: Multiple courses
    test("should calculate tuition for multiple courses", () => {
        const courses = [
            { creditHours: 3, pricePerCredit: 100 },
            { creditHours: 4, pricePerCredit: 120 },
            { creditHours: 3, pricePerCredit: 100 }
        ];

        expect(calculateTuition(courses, 0.2)).toEqual({
            subtotal: 1080,
            discount: 216,
            payable: 864
        });
    });

    // TEST 4: Omitted scholarship rate
    test("should use zero scholarship when rate is omitted", () => {
        expect(calculateTuition([validCourse])).toEqual({
            subtotal: 300,
            discount: 0,
            payable: 300
        });
    });

    // TEST 5: Undefined scholarship rate
    test("should use zero scholarship when rate is undefined", () => {
        expect(calculateTuition([validCourse], undefined))
            .toEqual({
                subtotal: 300,
                discount: 0,
                payable: 300
            });
    });

    // TEST 6: Null scholarship rate
    test("should reject null scholarship rate", () => {
        expect(() => calculateTuition([validCourse], null))
            .toThrow(TypeError);
    });

    // TEST 7: Invalid credit hour types
    test.each(["3", null, {}])(
        "should reject incorrect credit hour type: %p",
        (creditHours) => {
            const course = { ...validCourse, creditHours };

            expect(() => calculateTuition([course]))
                .toThrow(TypeError);
        }
    );

    // TEST 8: Invalid credit hour ranges
    test.each([-1, 1.5, NaN, Infinity])(
        "should reject invalid credit hours: %p",
        (creditHours) => {
            const course = { ...validCourse, creditHours };

            expect(() => calculateTuition([course]))
                .toThrow(RangeError);
        }
    );

    // TEST 9: Invalid price types
    test.each(["100", null, []])(
        "should reject incorrect price type: %p",
        (pricePerCredit) => {
            const course = { ...validCourse, pricePerCredit };

            expect(() => calculateTuition([course]))
                .toThrow(TypeError);
        }
    );

    // TEST 10: Invalid price values
    test.each([-10, NaN, Infinity, -Infinity])(
        "should reject invalid price: %p",
        (pricePerCredit) => {
            const course = { ...validCourse, pricePerCredit };

            expect(() => calculateTuition([course]))
                .toThrow(RangeError);
        }
    );

    // TEST 11: Invalid scholarship types
    test.each(["0.2", null, true])(
        "should reject incorrect scholarship type: %p",
        (rate) => {
            expect(() => calculateTuition([validCourse], rate))
                .toThrow(TypeError);
        }
    );

    // TEST 12: Invalid scholarship ranges
    test.each([-0.1, 1.1, NaN, Infinity])(
        "should reject invalid scholarship rate: %p",
        (rate) => {
            expect(() => calculateTuition([validCourse], rate))
                .toThrow(RangeError);
        }
    );

    // TEST 13: Zero credit hours and zero price
    test("should accept zero credit hours and zero price", () => {
        const courses = [
            { creditHours: 0, pricePerCredit: 100 },
            { creditHours: 3, pricePerCredit: 0 }
        ];

        expect(calculateTuition(courses)).toEqual({
            subtotal: 0,
            discount: 0,
            payable: 0
        });
    });

    // TEST 14: Monetary rounding
    test("should round tuition amounts to two decimal places", () => {
        const courses = [
            { creditHours: 1, pricePerCredit: 10.555 }
        ];

        expect(calculateTuition(courses, 0.1)).toEqual({
            subtotal: 10.56,
            discount: 1.06,
            payable: 9.50
        });
    });

    // TEST 15: Original course objects must remain unchanged
    test("should not modify the original course objects", () => {
        const courses = [
            { creditHours: 3, pricePerCredit: 100 },
            { creditHours: 4, pricePerCredit: 120 }
        ];

        const original = courses.map(course => ({ ...course }));

        calculateTuition(courses, 0.2);

        expect(courses).toStrictEqual(original);
    });

    // TEST 16: Find the most expensive course
    test("should find the course with the highest total cost", () => {
        const courseA = {
            name: "Mathematics",
            creditHours: 2,
            pricePerCredit: 100
        };

        const courseB = {
            name: "Programming",
            creditHours: 3,
            pricePerCredit: 80
        };

        const courseC = {
            name: "Database",
            creditHours: 1,
            pricePerCredit: 150
        };

        const result = tuition.findMostExpensiveCourse([
            courseA,
            courseB,
            courseC
        ]);

        expect(result).toBe(courseB);
    });

    // TEST 17: Empty course array
    test("should return null when no courses exist", () => {
        expect(tuition.findMostExpensiveCourse([])).toBeNull();
    });

    // TEST 18: Tied course costs
    test("should return the first course when there is a tie", () => {
        const courseA = {
            name: "Mathematics",
            creditHours: 2,
            pricePerCredit: 100
        };

        const courseB = {
            name: "Programming",
            creditHours: 4,
            pricePerCredit: 50
        };

        const result = tuition.findMostExpensiveCourse([
            courseA,
            courseB
        ]);

        expect(result).toBe(courseA);
    });

});
