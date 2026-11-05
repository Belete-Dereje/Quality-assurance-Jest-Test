import { checkEligibility } from "../../src/eligibility.js";

import {
    ageMutant,
    scoreMutant,
    logicalMutant,
    secondOrderMutant,
    thirdOrderMutant
} from "./eligibilityMutants.js";


describe("Eligibility Baseline Tests", () => {

    // Valid boundary inputs for the three parameters
    const ages = [0, 17, 18, 19, 120];
    const scores = [0, 59, 60, 61, 100];
    const documents = [true, false];

    const baselineCases = [];

    for (const age of ages) {
        for (const score of scores) {
            for (const hasDocument of documents) {
                baselineCases.push({ age, score, hasDocument });
            }
        }
    }

    // Compare the original function with an independent decision rule
    test.each(baselineCases)(
        "age=$age, score=$score, hasDocument=$hasDocument",
        ({ age, score, hasDocument }) => {

            const expected =
                age >= 18 && score >= 60 && hasDocument
                    ? "Eligible"
                    : "Not Eligible";

            expect(checkEligibility(age, score, hasDocument))
                .toBe(expected);
        }
    );
});


describe("Eligibility Mutant Tests", () => {

    // Each row gives a killing input and the expected outputs
    const mutantCases = [
        {
            id: "M1",
            description: "age >= 18 changed to age > 18",
            mutant: ageMutant,
            input: { age: 18, score: 60, hasDocument: true },
            originalOutput: "Eligible",
            mutantOutput: "Not Eligible"
        },
        {
            id: "M2",
            description: "score >= 60 changed to score > 60",
            mutant: scoreMutant,
            input: { age: 18, score: 60, hasDocument: true },
            originalOutput: "Eligible",
            mutantOutput: "Not Eligible"
        },
        {
            id: "M3",
            description: "first && changed to ||",
            mutant: logicalMutant,
            input: { age: 20, score: 10, hasDocument: true },
            originalOutput: "Not Eligible",
            mutantOutput: "Eligible"
        },
        {
            id: "M4",
            description: "second-order: both >= changed to >",
            mutant: secondOrderMutant,
            input: { age: 18, score: 60, hasDocument: true },
            originalOutput: "Eligible",
            mutantOutput: "Not Eligible"
        },
        {
            id: "M5",
            description: "third-order: both >= changed to > and && changed to ||",
            mutant: thirdOrderMutant,
            input: { age: 10, score: 10, hasDocument: true },
            originalOutput: "Not Eligible",
            mutantOutput: "Eligible"
        }
    ];

    test.each(mutantCases)(
        "$id should be killed: $description",
        ({ mutant, input, originalOutput, mutantOutput }) => {

            const originalResult = checkEligibility(
                input.age,
                input.score,
                input.hasDocument
            );

            const mutatedResult = mutant(
                input.age,
                input.score,
                input.hasDocument
            );

            expect(originalResult).toBe(originalOutput);
            expect(mutatedResult).toBe(mutantOutput);
            expect(mutatedResult).not.toBe(originalResult);
        }
    );
});
