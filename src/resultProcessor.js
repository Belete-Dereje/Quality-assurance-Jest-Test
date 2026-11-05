
// export function processResult(scores) {

//     if (scores.length === 0) {
//         return {
//             average: 0,
//             status: "No Scores"
//         };
//     }

//     const average = scores.reduce(
//         (sum, score) => sum + score, 0
//     ) / scores.length;

//     return {
//         average,
//         status: average >= 50 ? "Pass" : "Fail"
//     };
// }



//Corrected Version

export function processResult(scores) {

    // 1. Validate that input is an array
    if (!Array.isArray(scores)) {
        throw new TypeError("Scores must be an array");
    }

    // 2. Validate every individual score
    for (const score of scores) {

        // Check score data type
        if (typeof score !== "number") {
            throw new TypeError("Every score must be a number");
        }

        // Check finite numeric value
        if (!Number.isFinite(score)) {
            throw new RangeError(
                "Every score must be a finite number"
            );
        }

        // Check valid score range
        if (score < 0 || score > 100) {
            throw new RangeError(
                "Every score must be between 0 and 100"
            );
        }
    }

    // 3. Handle an empty score array
    if (scores.length === 0) {
        return {
            average: 0,
            status: "No Scores"
        };
    }

    // 4. Calculate the average
    const total = scores.reduce(
        (sum, score) => sum + score,
        0
    );

    const average = total / scores.length;

    // 5. Determine the student's result
    return {
        average,
        status: average >= 50 ? "Pass" : "Fail"
    };
}
