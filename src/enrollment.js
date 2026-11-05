// EnrollmentManager class manages student enrollments in courses

// export class EnrollmentManager {

//     constructor(notifier) {
//         this.enrollments = [];
//         this.notifier = notifier;
//     }

//     enroll(studentId, courseId) {
//         const record = { studentId, courseId };

//         this.enrollments.push(record);

//         this.notifier.send(
//             studentId,
//             `Enrolled in course ${courseId}`
//         );

//         return record;
//     }

//     getEnrollments(studentId) {
//         return this.enrollments.filter(
//             r => r.studentId === studentId
//         );
//     }
// }




//Corected version of the EnrollmentManager class with rollback functionality and error handling
export class EnrollmentManager {

    constructor(notifier) {
        this.enrollments = [];
        this.notifier = notifier;
    }

    // Enroll a student in a course
    enroll(studentId, courseId) {

        // 1. Prevent duplicate enrollment
        const alreadyEnrolled = this.enrollments.some(
            enrollment =>
                enrollment.studentId === studentId &&
                enrollment.courseId === courseId
        );

        if (alreadyEnrolled) {
            throw new Error("Student is already enrolled in this course");
        }

        // 2. Create the enrollment record
        const record = {
            studentId,
            courseId
        };

        // 3. Store the enrollment
        this.enrollments.push(record);

        // 4. Send notification
        try {
            this.notifier.send(
                studentId,
                `Enrolled in course ${courseId}`
            );

            return record;

        } catch (error) {

            // 5. Roll back enrollment if notification fails
            const index = this.enrollments.indexOf(record);

            if (index !== -1) {
                this.enrollments.splice(index, 1);
            }

            // 6. Rethrow the original error
            throw error;
        }
    }

    // Get enrollments for a student
    getEnrollments(studentId) {

        // Return copies of both the array and its records
        return this.enrollments
            .filter(enrollment => enrollment.studentId === studentId)
            .map(enrollment => ({ ...enrollment }));
    }

    // Remove a student's enrollment
    unenroll(studentId, courseId) {

        const index = this.enrollments.findIndex(
            enrollment =>
                enrollment.studentId === studentId &&
                enrollment.courseId === courseId
        );

        if (index === -1) {
            return false;
        }

        this.enrollments.splice(index, 1);

        return true;
    }
}
