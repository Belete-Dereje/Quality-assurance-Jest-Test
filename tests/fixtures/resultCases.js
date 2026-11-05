
export const resultCases = [

    // TEST CASE 1: Empty scores
    {
        description: "Empty score array",
        scores: [],
        expectedAverage: 0,
        expectedStatus: "No Scores"
    },

    // TEST CASE 2: Single zero score
    {
        description: "Single score of zero",
        scores: [0],
        expectedAverage: 0,
        expectedStatus: "Fail"
    },

    // TEST CASE 3: Single perfect score
    {
        description: "Single score of 100",
        scores: [100],
        expectedAverage: 100,
        expectedStatus: "Pass"
    },

    // TEST CASE 4: Single passing score
    {
        description: "Single passing score",
        scores: [70],
        expectedAverage: 70,
        expectedStatus: "Pass"
    },

    // TEST CASE 5: Single failing score
    {
        description: "Single failing score",
        scores: [40],
        expectedAverage: 40,
        expectedStatus: "Fail"
    },

    // TEST CASE 6: Duplicate scores
    {
        description: "Duplicate scores",
        scores: [80, 80],
        expectedAverage: 80,
        expectedStatus: "Pass"
    },

    // TEST CASE 7: Multiple scores with duplicates
    {
        description: "Multiple scores with duplicates",
        scores: [80, 80, 40],
        expectedAverage: 200 / 3,
        expectedStatus: "Pass"
    },

    // TEST CASE 8: Average immediately below 50
    {
        description: "Average immediately below 50",
        scores: [49.99, 49.99],
        expectedAverage: 49.99,
        expectedStatus: "Fail"
    },

    // TEST CASE 9: Average exactly 50
    {
        description: "Average exactly 50",
        scores: [50, 50],
        expectedAverage: 50,
        expectedStatus: "Pass"
    },

    // TEST CASE 10: Decimal scores
    {
        description: "Decimal scores",
        scores: [49.5, 50.5],
        expectedAverage: 50,
        expectedStatus: "Pass"
    },

    // TEST CASE 11: Multiple decimal scores
    {
        description: "Multiple decimal scores",
        scores: [10.5, 20.5, 30.5],
        expectedAverage: 20.5,
        expectedStatus: "Fail"
    },

    // TEST CASE 12: Boundary scores
    {
        description: "Scores of zero and 100",
        scores: [0, 100],
        expectedAverage: 50,
        expectedStatus: "Pass"
    },

    // TEST CASE 13: Repeated failing scores
    {
        description: "Repeated failing scores",
        scores: [25, 25, 25, 25],
        expectedAverage: 25,
        expectedStatus: "Fail"
    },

    // TEST CASE 14: Several different scores
    {
        description: "Multiple assessment scores",
        scores: [90, 80, 70, 60],
        expectedAverage: 75,
        expectedStatus: "Pass"
    },

    // TEST CASE 15: All zero scores
    {
        description: "All assessment scores are zero",
        scores: [0, 0, 0],
        expectedAverage: 0,
        expectedStatus: "Fail"
    },

    // TEST CASE 16: High decimal scores
    {
        description: "High decimal scores",
        scores: [99.5, 100],
        expectedAverage: 99.75,
        expectedStatus: "Pass"
    }

];
