
export function evaluateStudentSupport(student) {

    if (student.average < 40) {
        return "Critical Academic Warning";
    }

    if (student.average < 50) {
        return "Academic Warning";
    }

    if (student.attendance < 60) {
        return "Critical Attendance Warning";
    }

    if (student.attendance < 75) {
        return "Attendance Warning";
    }

    if (student.credits < 6) {
        return "Insufficient Credits";
    }

    if (student.credits < 12) {
        return "Credit Warning";
    }

    if (student.unpaidFees === true) {
        return "Payment Hold";
    }

    if (student.disciplinaryAction === true) {
        return "Disciplinary Review";
    }

    if (
        student.isInternational === true &&
        student.average < 60
    ) {
        return "International Review";
    }

    return "Good Standing";
}
