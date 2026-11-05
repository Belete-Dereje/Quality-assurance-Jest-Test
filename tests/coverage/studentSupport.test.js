
import { evaluateStudentSupport } from "../../src/studentSupport.js";

describe("Student Support Coverage Tests", () => {

    const supportCases = [

        {
            description: "Critical academic warning",
            student: {
                average: 35,
                attendance: 80,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Critical Academic Warning"
        },

        {
            description: "Academic warning",
            student: {
                average: 45,
                attendance: 80,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Academic Warning"
        },

        {
            description: "Critical attendance warning",
            student: {
                average: 55,
                attendance: 55,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Critical Attendance Warning"
        },

        {
            description: "Attendance warning",
            student: {
                average: 55,
                attendance: 70,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Attendance Warning"
        },

        {
            description: "Insufficient credits",
            student: {
                average: 55,
                attendance: 80,
                credits: 5,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Insufficient Credits"
        },

        {
            description: "Credit warning",
            student: {
                average: 55,
                attendance: 80,
                credits: 8,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Credit Warning"
        },

        {
            description: "Payment hold",
            student: {
                average: 55,
                attendance: 80,
                credits: 15,
                unpaidFees: true,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Payment Hold"
        },

        {
            description: "Disciplinary review",
            student: {
                average: 55,
                attendance: 80,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: true,
                isInternational: false
            },
            expected: "Disciplinary Review"
        },

        {
            description: "International review",
            student: {
                average: 55,
                attendance: 80,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: true
            },
            expected: "International Review"
        },

        {
            description: "Good standing for domestic student",
            student: {
                average: 65,
                attendance: 85,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: false
            },
            expected: "Good Standing"
        },

        {
            description: "Good standing for international student with sufficient average",
            student: {
                average: 65,
                attendance: 85,
                credits: 15,
                unpaidFees: false,
                disciplinaryAction: false,
                isInternational: true
            },
            expected: "Good Standing"
        }

    ];


    // TEST 1: Exercise all decision outcomes and branches
    test.each(supportCases)(
        "should evaluate $description",
        ({ student, expected }) => {

            const result = evaluateStudentSupport(student);

            expect(result).toBe(expected);
        }
    );


    // TEST 2: Demonstrate an intentionally weak assertion
    test("should demonstrate high coverage with a weak assertion", () => {

        const student = {
            average: 65,
            attendance: 85,
            credits: 15,
            unpaidFees: false,
            disciplinaryAction: false,
            isInternational: false
        };

        const result = evaluateStudentSupport(student);

        // This assertion only checks that a result exists.
        // It does not verify whether the result is correct.
        expect(result).toBeTruthy();
    });

});
