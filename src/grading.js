
// export class GradeBook {
//     constructor(studentId) {
//         this.studentId = studentId;
//         this.scores = [];
//     }

//     addScore(score) {
//         this.scores.push(score);
//     }

//     getAverage() {
//         if (this.scores.length === 0) return 0;

//         const total = this.scores.reduce(
//             (sum, score) => sum + score, 0
//         );

//         return total / this.scores.length;
//     }

//     getHighestScore() {
//         return Math.max(...this.scores);
//     }

//     removeLowestScore() {
//         if (this.scores.length === 0) return null;

//         const lowest = Math.min(...this.scores);
//         const index = this.scores.indexOf(lowest);
//         this.scores.splice(index, 1);

//         return lowest;
//     }

//     static isPassing(average) {
//         return average >= 50;
//     }
// }


/*After refactoring, the GradeBook class has been improved to include comprehensive validation 
for scores, ensuring that only valid numeric scores within the range of 0 to 100 are accepted. 
The class maintains independent instances for different students and provides methods to calculate averages,
retrieve the highest score, and remove the lowest score while handling edge cases appropriately.
*/

export class GradeBook {

    constructor(studentId) {
        this.studentId = studentId;
        this.scores = [];
    }

    // Add a score after validation
    addScore(score) {

        if (typeof score !== "number") {
            throw new TypeError("Score must be a number");
        }


        if (
            !Number.isFinite(score) ||
            score < 0 ||
            score > 100
        ) {
            throw new RangeError(
                "Score must be a finite number between 0 and 100"
            );
        }

        this.scores.push(score);
    }

    // Calculate the average score
    getAverage() {

        if (this.scores.length === 0) {
            return 0;
        }

        const total = this.scores.reduce(
            (sum, score) => sum + score, 0
        );

        return total / this.scores.length;
    }

    // Get the highest score
    getHighestScore() {

        if (this.scores.length === 0) {
            return null;
        }

        return Math.max(...this.scores);
    }

    // Remove one occurrence of the lowest score
    removeLowestScore() {

        if (this.scores.length === 0) {
            return null;
        }

        const lowestScore = Math.min(...this.scores);
        const index = this.scores.indexOf(lowestScore);

        const removedScore = this.scores.splice(index, 1)[0];

        return removedScore;
    }

    // Check whether the average is passing
    static isPassing(average) {
        return average >= 50;
    }
}
