//Before refactoring, the original function was as follows:
// export function registerStudent(student) {
//     if (!student.name || student.name.trim() === "") {
//         throw new Error("Student name is required");
//     }

//     if (student.age < 18) {
//         throw new Error("Student must be at least 18");
//     }

//     if (!student.email.includes("@")) {
//         throw new Error("Invalid email");
//     }

//     return {
//         id: student.id,
//         name: student.name.trim(),
//         age: student.age,
//         email: student.email.toLowerCase(),
//         status: "Registered"
//     };
// }


/*After refactoring, the function has been improved to include comprehensive 
validation for the student object, including checks for null or non-object types, 
safe integer validation for IDs, string validation for names and emails, 
and range checks for ages.*/
export function registerStudent(student) {

    // 1. Validate the student object
    if (
        student === null ||
        typeof student !== "object" ||
        Array.isArray(student)
    ) {
        throw new TypeError("Student must be an object");
    }

    // 2. Validate student ID
    if (typeof student.id !== "number") {
        throw new TypeError("Student ID must be a number");
    }

    if (!Number.isSafeInteger(student.id) || student.id <= 0) {
        throw new RangeError(
            "Student ID must be a positive safe integer"
        );
    }

    // 3. Validate student name
    if (
        student.name === undefined ||
        student.name === null ||
        (typeof student.name === "string" &&
            student.name.trim() === "")
    ) {
        throw new Error("Student name is required");
    }

    if (typeof student.name !== "string") {
        throw new TypeError("Student name must be a string");
    }

    // 4. Validate student age
    if (typeof student.age !== "number") {
        throw new TypeError("Student age must be a number");
    }

    if (
        !Number.isInteger(student.age) ||
        student.age < 18 ||
        student.age > 120
    ) {
        throw new RangeError(
            "Student age must be an integer between 18 and 120"
        );
    }

    // 5. Validate student email
    if (typeof student.email !== "string") {
        throw new TypeError("Student email must be a string");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(student.email)) {
        throw new Error("Invalid email");
    }

    //Return the registered student
    return {
        id: student.id,
        name: student.name.trim(),
        age: student.age,
        email: student.email.toLowerCase(),
        status: "Registered"
    };
}
