
export const scholarshipCases = [

    // FULL SCHOLARSHIP CASES

    {
        description: "Exact full scholarship boundaries",
        student: {
            average: 90,
            attendance: 95,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Full Scholarship"
    },

    {
        description: "Student exceeds all full scholarship requirements",
        student: {
            average: 95,
            attendance: 98,
            credits: 18,
            disciplinaryAction: false
        },
        expected: "Full Scholarship"
    },

    // PARTIAL SCHOLARSHIP CASES

    {
        description: "Exact partial scholarship boundaries",
        student: {
            average: 80,
            attendance: 85,
            credits: 12,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    {
        description: "Student qualifies for partial scholarship",
        student: {
            average: 85,
            attendance: 90,
            credits: 14,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    // FULL SCHOLARSHIP SINGLE-CONDITION FAILURES

    {
        description: "Average below full threshold but qualifies for partial",
        student: {
            average: 89.99,
            attendance: 95,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    {
        description: "Attendance below full threshold but qualifies for partial",
        student: {
            average: 90,
            attendance: 94.99,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    {
        description: "Credits below full threshold but qualifies for partial",
        student: {
            average: 90,
            attendance: 95,
            credits: 14,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    // PARTIAL SCHOLARSHIP SINGLE-CONDITION FAILURES

    {
        description: "Average below partial threshold",
        student: {
            average: 79.99,
            attendance: 95,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Not Eligible"
    },

    {
        description: "Attendance below partial threshold",
        student: {
            average: 90,
            attendance: 84.99,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Not Eligible"
    },

    {
        description: "Credits below partial threshold",
        student: {
            average: 90,
            attendance: 95,
            credits: 11,
            disciplinaryAction: false
        },
        expected: "Not Eligible"
    },

    // DISCIPLINARY REJECTION

    {
        description: "Reject otherwise full-eligible student with disciplinary action",
        student: {
            average: 95,
            attendance: 98,
            credits: 18,
            disciplinaryAction: true
        },
        expected: "Rejected"
    },

    {
        description: "Reject otherwise partial-eligible student with disciplinary action",
        student: {
            average: 85,
            attendance: 90,
            credits: 14,
            disciplinaryAction: true
        },
        expected: "Rejected"
    },

    // ADDITIONAL BOUNDARY AND COMBINATION CASES

    {
        description: "Average exactly 80",
        student: {
            average: 80,
            attendance: 90,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    {
        description: "Average exactly 90",
        student: {
            average: 90,
            attendance: 95,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Full Scholarship"
    },

    {
        description: "Attendance exactly 85",
        student: {
            average: 85,
            attendance: 85,
            credits: 12,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    {
        description: "Attendance exactly 95",
        student: {
            average: 90,
            attendance: 95,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Full Scholarship"
    },

    {
        description: "Credits exactly 12",
        student: {
            average: 80,
            attendance: 85,
            credits: 12,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    {
        description: "Credits exactly 15",
        student: {
            average: 90,
            attendance: 95,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Full Scholarship"
    },

    {
        description: "Average below 80 with excellent attendance and credits",
        student: {
            average: 75,
            attendance: 99,
            credits: 20,
            disciplinaryAction: false
        },
        expected: "Not Eligible"
    },

    {
        description: "All academic requirements fail",
        student: {
            average: 60,
            attendance: 70,
            credits: 8,
            disciplinaryAction: false
        },
        expected: "Not Eligible"
    },

    {
        description: "Average 89 with full attendance and minimum full credits",
        student: {
            average: 89,
            attendance: 100,
            credits: 15,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    },

    {
        description: "Partial scholarship with exactly minimum attendance",
        student: {
            average: 90,
            attendance: 85,
            credits: 12,
            disciplinaryAction: false
        },
        expected: "Partial Scholarship"
    }

];


// Small array-based test table demonstrating equivalent cases
export const arrayScholarshipCases = [

    [
        "Full scholarship",
        { average: 90, attendance: 95, credits: 15, disciplinaryAction: false },
        "Full Scholarship"
    ],

    [
        "Partial scholarship",
        { average: 80, attendance: 85, credits: 12, disciplinaryAction: false },
        "Partial Scholarship"
    ],

    [
        "Rejected student",
        { average: 95, attendance: 98, credits: 18, disciplinaryAction: true },
        "Rejected"
    ],

    [
        "Not eligible",
        { average: 70, attendance: 75, credits: 10, disciplinaryAction: false },
        "Not Eligible"
    ]

];
