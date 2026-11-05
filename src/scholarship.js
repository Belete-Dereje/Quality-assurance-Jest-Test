
// export function evaluateScholarship(student) {

//     const {
//         average,
//         attendance,
//         credits,
//         disciplinaryAction
//     } = student;

//     if (disciplinaryAction) {
//         return "Rejected";
//     }

//     if (average >= 90 && attendance >= 95 && credits >= 15) {
//         return "Full Scholarship";
//     }

//     if (average >= 80 && attendance >= 85 && credits >= 12) {
//         return "Partial Scholarship";
//     }

//     return "Not Eligible";
// }




//After Correction
export function evaluateScholarship(student) {

    // 1. Validate the student object
    if (
        student === null ||
        typeof student !== "object" ||
        Array.isArray(student)
    ) {
        throw new TypeError("Student must be an object");
    }

    const {
        average,
        attendance,
        credits,
        disciplinaryAction
    } = student;

    // 2. Validate average data type
    if (typeof average !== "number") {
        throw new TypeError("Average must be a number");
    }

    // 3. Validate average range
    if (
        !Number.isFinite(average) ||
        average < 0 ||
        average > 100
    ) {
        throw new RangeError(
            "Average must be between 0 and 100"
        );
    }

    // 4. Validate attendance data type
    if (typeof attendance !== "number") {
        throw new TypeError("Attendance must be a number");
    }

    // 5. Validate attendance range
    if (
        !Number.isFinite(attendance) ||
        attendance < 0 ||
        attendance > 100
    ) {
        throw new RangeError(
            "Attendance must be between 0 and 100"
        );
    }

    // 6. Validate credits data type
    if (typeof credits !== "number") {
        throw new TypeError("Credits must be a number");
    }

    // 7. Validate credits range and integer requirement
    if (
        !Number.isInteger(credits) ||
        credits < 0
    ) {
        throw new RangeError(
            "Credits must be a nonnegative integer"
        );
    }

    // 8. Validate disciplinary action
    if (typeof disciplinaryAction !== "boolean") {
        throw new TypeError(
            "Disciplinary action must be a Boolean"
        );
    }

    // 9. Scholarship decision rules

    if (disciplinaryAction) {
        return "Rejected";
    }

    if (
        average >= 90 &&
        attendance >= 95 &&
        credits >= 15
    ) {
        return "Full Scholarship";
    }

    if (
        average >= 80 &&
        attendance >= 85 &&
        credits >= 12
    ) {
        return "Partial Scholarship";
    }

    return "Not Eligible";
}
