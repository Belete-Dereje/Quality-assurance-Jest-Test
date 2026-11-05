
import { evaluateAdmission } from "../../src/admission.js";

describe("Admission System Coverage Tests", () => {

    // INITIAL TEST 1: Successful admission without scholarship
    test("should accept an applicant without scholarship", () => {

        const applicant = {
            age: 20,
            score: 80,
            hasCertificate: true,
            applicationFeePaid: true,
            isInternational: false
        };

        expect(evaluateAdmission(applicant)).toEqual({
            status: "Accepted",
            scholarship: false
        });
    });

    // INITIAL TEST 2: Successful admission with scholarship
    test("should accept an applicant with scholarship", () => {

        const applicant = {
            age: 22,
            score: 95,
            hasCertificate: true,
            applicationFeePaid: true,
            isInternational: false
        };

        expect(evaluateAdmission(applicant)).toEqual({
            status: "Accepted",
            scholarship: true
        });
    });


    // ADDITIONAL TESTS: Every return path and boundary
    const admissionCases = [

        // Age boundaries
        {
            description: "should reject an applicant aged 17",
            applicant: {
                age: 17,
                score: 90,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Rejected",
                reason: "Underage"
            }
        },

        {
            description: "should accept an applicant aged exactly 18",
            applicant: {
                age: 18,
                score: 60,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Accepted",
                scholarship: false
            }
        },

        // Score boundaries: 59 and 60
        {
            description: "should reject an applicant scoring 59",
            applicant: {
                age: 18,
                score: 59,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Rejected",
                reason: "Low Score"
            }
        },

        {
            description: "should accept an applicant scoring exactly 60",
            applicant: {
                age: 18,
                score: 60,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Accepted",
                scholarship: false
            }
        },

        // Certificate requirement
        {
            description: "should return pending when certificate is missing",
            applicant: {
                age: 20,
                score: 80,
                hasCertificate: false,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Pending",
                reason: "Missing Certificate"
            }
        },

        // Application fee requirement
        {
            description: "should return pending when application fee is unpaid",
            applicant: {
                age: 20,
                score: 80,
                hasCertificate: true,
                applicationFeePaid: false,
                isInternational: false
            },
            expected: {
                status: "Pending",
                reason: "Payment Required"
            }
        },

        // International review boundary: 74
        {
            description: "should require international review at score 74",
            applicant: {
                age: 20,
                score: 74,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: true
            },
            expected: {
                status: "Pending",
                reason: "International Review"
            }
        },

        // International review boundary: 75
        {
            description: "should accept international applicant scoring 75",
            applicant: {
                age: 20,
                score: 75,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: true
            },
            expected: {
                status: "Accepted",
                scholarship: false
            }
        },

        // Domestic applicant scoring below 75
        {
            description: "should not require international review for domestic applicants",
            applicant: {
                age: 20,
                score: 74,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Accepted",
                scholarship: false
            }
        },

        // Scholarship boundaries: 89 and 90
        {
            description: "should accept applicant scoring 89 without scholarship",
            applicant: {
                age: 20,
                score: 89,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Accepted",
                scholarship: false
            }
        },

        {
            description: "should award scholarship at score 90",
            applicant: {
                age: 20,
                score: 90,
                hasCertificate: true,
                applicationFeePaid: true,
                isInternational: false
            },
            expected: {
                status: "Accepted",
                scholarship: true
            }
        },

        // Combination not guaranteed by branch coverage alone
        {
            description: "should prioritize missing certificate when fee is also unpaid",
            applicant: {
                age: 20,
                score: 80,
                hasCertificate: false,
                applicationFeePaid: false,
                isInternational: false
            },
            expected: {
                status: "Pending",
                reason: "Missing Certificate"
            }
        }

    ];


    // Execute all additional cases
    test.each(admissionCases)(
        "$description",
        ({ applicant, expected }) => {

            expect(evaluateAdmission(applicant)).toEqual(expected);
        }
    );

});
