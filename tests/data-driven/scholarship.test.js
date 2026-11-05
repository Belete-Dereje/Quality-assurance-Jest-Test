
import { evaluateScholarship } from "../../src/scholarship.js";

import {
    scholarshipCases,
    arrayScholarshipCases
} from "../fixtures/scholarshipCases.js";


describe("Scholarship Eligibility Tests", () => {

    // TEST 1: Object-based data-driven testing
    test.each(scholarshipCases)(
        "$description",
        ({ student, expected }) => {

            const result = evaluateScholarship(student);

            expect(result).toBe(expected);
        }
    );


    // TEST 2: Equivalent array-based test table
    test.each(arrayScholarshipCases)(
        "%s",
        (description, student, expected) => {

            const result = evaluateScholarship(student);

            expect(result).toBe(expected);
        }
    );


    // TEST 3: Reject incorrect input types
    test.each([

        {
            description: "Average provided as a string",
            student: {
                average: "90",
                attendance: 95,
                credits: 15,
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Average provided as null",
            student: {
                average: null,
                attendance: 95,
                credits: 15,
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Attendance provided as a string",
            student: {
                average: 90,
                attendance: "95",
                credits: 15,
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Attendance provided as a Boolean",
            student: {
                average: 90,
                attendance: true,
                credits: 15,
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Credits provided as a string",
            student: {
                average: 90,
                attendance: 95,
                credits: "15",
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Disciplinary action provided as a string",
            student: {
                average: 90,
                attendance: 95,
                credits: 15,
                disciplinaryAction: "false"
            },
            error: TypeError
        },

        {
            description: "Disciplinary action provided as a number",
            student: {
                average: 90,
                attendance: 95,
                credits: 15,
                disciplinaryAction: 0
            },
            error: TypeError
        },

        {
            description: "Average property is missing",
            student: {
                attendance: 95,
                credits: 15,
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Attendance property is missing",
            student: {
                average: 90,
                credits: 15,
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Credits property is missing",
            student: {
                average: 90,
                attendance: 95,
                disciplinaryAction: false
            },
            error: TypeError
        },

        {
            description: "Disciplinary action property is missing",
            student: {
                average: 90,
                attendance: 95,
                credits: 15
            },
            error: TypeError
        }

    ])(
        "should reject invalid types: $description",
        ({ student, error }) => {

            expect(() => evaluateScholarship(student))
                .toThrow(error);
        }
    );


    // TEST 4: Reject invalid numeric ranges
    test.each([

        {
            description: "Average below zero",
            student: {
                average: -1,
                attendance: 95,
                credits: 15,
                disciplinaryAction: false
            }
        },

        {
            description: "Average above 100",
            student: {
                average: 101,
                attendance: 95,
                credits: 15,
                disciplinaryAction: false
            }
        },

        {
            description: "Average is NaN",
            student: {
                average: NaN,
                attendance: 95,
                credits: 15,
                disciplinaryAction: false
            }
        },

        {
            description: "Average is Infinity",
            student: {
                average: Infinity,
                attendance: 95,
                credits: 15,
                disciplinaryAction: false
            }
        },

        {
            description: "Attendance below zero",
            student: {
                average: 90,
                attendance: -1,
                credits: 15,
                disciplinaryAction: false
            }
        },

        {
            description: "Attendance above 100",
            student: {
                average: 90,
                attendance: 101,
                credits: 15,
                disciplinaryAction: false
            }
        },

        {
            description: "Attendance is NaN",
            student: {
                average: 90,
                attendance: NaN,
                credits: 15,
                disciplinaryAction: false
            }
        },

        {
            description: "Credits cannot be negative",
            student: {
                average: 90,
                attendance: 95,
                credits: -1,
                disciplinaryAction: false
            }
        },

        {
            description: "Credits cannot be decimal",
            student: {
                average: 90,
                attendance: 95,
                credits: 12.5,
                disciplinaryAction: false
            }
        },

        {
            description: "Credits cannot be Infinity",
            student: {
                average: 90,
                attendance: 95,
                credits: Infinity,
                disciplinaryAction: false
            }
        }

    ])(
        "should reject invalid numeric values: $description",
        ({ student }) => {

            expect(() => evaluateScholarship(student))
                .toThrow(RangeError);
        }
    );
    
    // MUTATION TEST 1: Average zero is valid
    test("should accept zero as a valid average boundary", () => {

        const student = {
            average: 0,
            attendance: 90,
            credits: 15,
            disciplinaryAction: false
        };

        expect(evaluateScholarship(student))
            .toBe("Not Eligible");
    });


    // MUTATION TEST 2: Average 100 is valid
    test("should accept 100 as a valid average boundary", () => {

        const student = {
            average: 100,
            attendance: 100,
            credits: 15,
            disciplinaryAction: false
        };

        expect(evaluateScholarship(student))
            .toBe("Full Scholarship");
    });


    // MUTATION TEST 3: Attendance zero is valid
    test("should accept zero as a valid attendance boundary", () => {

        const student = {
            average: 90,
            attendance: 0,
            credits: 15,
            disciplinaryAction: false
        };

        expect(evaluateScholarship(student))
            .toBe("Not Eligible");
    });


    // MUTATION TEST 4: Credits zero is valid
    test("should accept zero as a valid credits boundary", () => {

        const student = {
            average: 90,
            attendance: 95,
            credits: 0,
            disciplinaryAction: false
        };

        expect(evaluateScholarship(student))
            .toBe("Not Eligible");
    });


    // MUTATION TEST 5: Student must be a valid object
    test("should reject null student input with the correct error", () => {

        expect(() => evaluateScholarship(null))
            .toThrow("Student must be an object");
    });
    
    // Additional mutation test: Reject primitive student input
    test.each([
        "invalid student",
        123,
        undefined
    ])(
        "should reject non-object student input: %p",
        (student) => {

            expect(() => evaluateScholarship(student))
                .toThrow("Student must be an object");
        }
    );


});
