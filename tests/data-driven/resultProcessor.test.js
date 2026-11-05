
import { processResult } from "../../src/resultProcessor.js";
import { resultCases } from "../fixtures/resultCases.js";

describe("Student Result Processing Tests", () => {

    // TEST 1: Reusable data-driven test cases
    test.each(resultCases)(
        "$description",
        ({ scores, expectedAverage, expectedStatus }) => {

            const result = processResult(scores);

            expect(result).toEqual({
                average: expectedAverage,
                status: expectedStatus
            });
        }
    );


    // TEST 2: Reject invalid score array types
    test.each([
        {
            description: "String instead of an array",
            scores: "80"
        },
        {
            description: "Null instead of an array",
            scores: null
        },
        {
            description: "Undefined instead of an array",
            scores: undefined
        },
        {
            description: "Object instead of an array",
            scores: {}
        },
        {
            description: "Number instead of an array",
            scores: 80
        }
    ])(
        "should reject invalid score array: $description",
        ({ scores }) => {

            expect(() => processResult(scores))
                .toThrow(TypeError);
        }
    );


    // TEST 3: Reject incorrect individual score types
    test.each([
        {
            description: "String score",
            scores: [80, "90", 70]
        },
        {
            description: "Nested array",
            scores: [80, [90], 70]
        },
        {
            description: "Null score",
            scores: [80, null, 70]
        },
        {
            description: "Object score",
            scores: [80, {}, 70]
        },
        {
            description: "Boolean score",
            scores: [80, true, 70]
        }
    ])(
        "should reject invalid score types: $description",
        ({ scores }) => {

            expect(() => processResult(scores))
                .toThrow(TypeError);
        }
    );


    // TEST 4: Reject non-finite numeric scores
    test.each([
        {
            description: "NaN score",
            scores: [80, NaN, 70]
        },
        {
            description: "Positive Infinity",
            scores: [80, Infinity, 70]
        },
        {
            description: "Negative Infinity",
            scores: [80, -Infinity, 70]
        }
    ])(
        "should reject non-finite scores: $description",
        ({ scores }) => {

            expect(() => processResult(scores))
                .toThrow(RangeError);
        }
    );


    // TEST 5: Reject scores outside the valid range
    test.each([
        {
            description: "Negative score",
            scores: [80, -1, 70]
        },
        {
            description: "Score above 100",
            scores: [80, 101, 70]
        }
    ])(
        "should reject out-of-range scores: $description",
        ({ scores }) => {

            expect(() => processResult(scores))
                .toThrow(RangeError);
        }
    );


    // TEST 6: Original input array must remain unchanged
    test("should not modify the original scores array", () => {

        const scores = [80, 70, 90, 60];

        const originalScores = [...scores];

        processResult(scores);

        expect(scores).toStrictEqual(originalScores);
    });

});
