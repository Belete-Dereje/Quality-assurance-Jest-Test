
// export class StudentRepository {

//     constructor() {
//         this.students = [];
//     }

//     add(student) {
//         this.students.push(student);
//         return student;
//     }

//     findById(id) {
//         return this.students.find(
//             student => student.id === id
//         );
//     }

//     remove(id) {
//         this.students = this.students.filter(
//             student => student.id !== id
//         );
//     }

//     count() {
//         return this.students.length;
//     }
// }



//After correcting

export class StudentRepository {

    constructor() {
        this.students = [];
    }

    // Add a student and reject duplicate IDs
    add(student) {

        const duplicate = this.students.some(
            existing => existing.id === student.id
        );

        if (duplicate) {
            throw new Error("Student ID already exists");
        }

        this.students.push(student);

        return student;
    }

    // Find a student using their ID
    findById(id) {
        return this.students.find(
            student => student.id === id
        );
    }

    // Remove a student using their ID
    remove(id) {
        this.students = this.students.filter(
            student => student.id !== id
        );
    }

    // Return the number of registered students
    count() {
        return this.students.length;
    }
}
