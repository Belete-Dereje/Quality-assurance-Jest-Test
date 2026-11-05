
// export function calculateTuition(courses, scholarshipRate = 0) {

//     const subtotal = courses.reduce(
//         (sum, course) =>
//             sum + course.creditHours * course.pricePerCredit,
//         0
//     );

//     const discount = subtotal * scholarshipRate;

//     return {
//         subtotal,
//         discount,
//         payable: subtotal - discount
//     };
// }




/*
 * Monetary rounding policy:
 * 1. Calculate the raw tuition subtotal.
 * 2. Round the subtotal to two decimal places.
 * 3. Calculate and round the scholarship discount.
 * 4. Subtract the rounded discount from the rounded subtotal.
 * 5. Round the final payable amount to two decimal places.
 */

function roundMoney(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
}


// Validate the courses array and its individual course records
function validateCourses(courses) {

    if (!Array.isArray(courses)) {
        throw new TypeError("Courses must be an array");
    }

    courses.forEach((course) => {

        if (
            course === null ||
            typeof course !== "object" ||
            Array.isArray(course)
        ) {
            throw new TypeError("Each course must be an object");
        }

        // Validate credit hours
        if (typeof course.creditHours !== "number") {
            throw new TypeError("Credit hours must be a number");
        }

        if (
            !Number.isInteger(course.creditHours) ||
            course.creditHours < 0
        ) {
            throw new RangeError(
                "Credit hours must be a nonnegative integer"
            );
        }

        // Validate price per credit
        if (typeof course.pricePerCredit !== "number") {
            throw new TypeError("Price per credit must be a number");
        }

        if (
            !Number.isFinite(course.pricePerCredit) ||
            course.pricePerCredit < 0
        ) {
            throw new RangeError(
                "Price per credit must be a nonnegative finite number"
            );
        }
    });
}


// Validate scholarship rate
function validateScholarshipRate(rate) {

    if (typeof rate !== "number") {
        throw new TypeError("Scholarship rate must be a number");
    }

    if (
        !Number.isFinite(rate) ||
        rate < 0 ||
        rate > 1
    ) {
        throw new RangeError(
            "Scholarship rate must be between 0 and 1"
        );
    }
}


// Calculate total tuition
export function calculateTuition(courses, scholarshipRate = 0) {

    // Validate input data
    validateCourses(courses);
    validateScholarshipRate(scholarshipRate);

    // Calculate raw subtotal
    const rawSubtotal = courses.reduce(
        (sum, course) =>
            sum + course.creditHours * course.pricePerCredit,
        0
    );

    // Round subtotal
    const subtotal = roundMoney(rawSubtotal);

    // Calculate and round discount
    const discount = roundMoney(
        subtotal * scholarshipRate
    );

    // Calculate and round final payable amount
    const payable = roundMoney(subtotal - discount);

    return {
        subtotal,
        discount,
        payable
    };
}


// Find the most expensive course
export function findMostExpensiveCourse(courses) {

    validateCourses(courses);

    if (courses.length === 0) {
        return null;
    }

    let mostExpensive = courses[0];

    for (let i = 1; i < courses.length; i++) {

        const currentCost =
            courses[i].creditHours * courses[i].pricePerCredit;

        const highestCost =
            mostExpensive.creditHours *
            mostExpensive.pricePerCredit;

        if (currentCost > highestCost) {
            mostExpensive = courses[i];
        }
    }

    // Return the first course with the highest total cost
    return mostExpensive;
}
