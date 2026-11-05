
import { processPayment } from "../../src/payment.js";

describe("Tuition Payment Tests", () => {

    // TEST 1: Parameterized tests for card and bank payments
    describe.each([
        {
            method: "card",
            cases: [
                {
                    description: "domestic payment of 1000",
                    amount: 1000,
                    isInternational: false,
                    expected: 1025
                },
                {
                    description: "international payment of 1000",
                    amount: 1000,
                    isInternational: true,
                    expected: 1040
                },
                {
                    description: "domestic decimal payment",
                    amount: 10.10,
                    isInternational: false,
                    expected: 10.35
                },
                {
                    description: "international decimal payment",
                    amount: 10.10,
                    isInternational: true,
                    expected: 10.50
                },
                {
                    description: "domestic large payment",
                    amount: 1000000,
                    isInternational: false,
                    expected: 1025000
                },
                {
                    description: "international large payment",
                    amount: 1000000,
                    isInternational: true,
                    expected: 1040000
                }
            ]
        },
        {
            method: "bank",
            cases: [
                {
                    description: "domestic payment of 1000",
                    amount: 1000,
                    isInternational: false,
                    expected: 1010
                },
                {
                    description: "international payment of 1000",
                    amount: 1000,
                    isInternational: true,
                    expected: 1025
                },
                {
                    description: "domestic decimal payment",
                    amount: 10.10,
                    isInternational: false,
                    expected: 20.10
                },
                {
                    description: "international decimal payment",
                    amount: 10.10,
                    isInternational: true,
                    expected: 20.25
                },
                {
                    description: "domestic large payment",
                    amount: 1000000,
                    isInternational: false,
                    expected: 1000010
                },
                {
                    description: "international large payment",
                    amount: 1000000,
                    isInternational: true,
                    expected: 1015010
                }
            ]
        }
    ])("$method payment tests", ({ method, cases }) => {

        // TEST 2: Domestic and international combinations
        test.each(cases)(
            "should calculate $description correctly",
            ({ amount, isInternational, expected }) => {

                const result = processPayment(
                    amount,
                    method,
                    isInternational
                );

                expect(result).toBe(expected);
            }
        );

    });


    // TEST 3: Reject invalid payment amounts
    test.each([
        {
            description: "zero amount",
            amount: 0,
            error: RangeError
        },
        {
            description: "negative amount",
            amount: -100,
            error: RangeError
        },
        {
            description: "NaN amount",
            amount: NaN,
            error: RangeError
        },
        {
            description: "infinite amount",
            amount: Infinity,
            error: RangeError
        },
        {
            description: "negative infinite amount",
            amount: -Infinity,
            error: RangeError
        },
        {
            description: "string amount",
            amount: "100",
            error: TypeError
        },
        {
            description: "null amount",
            amount: null,
            error: TypeError
        },
        {
            description: "missing amount",
            amount: undefined,
            error: TypeError
        }
    ])(
        "should reject $description",
        ({ amount, error }) => {

            expect(() =>
                processPayment(amount, "card", false)
            ).toThrow(error);
        }
    );


    // TEST 4: Reject unsupported payment methods
    test.each([
        {
            method: "cash",
            error: Error
        },
        {
            method: "mobile money",
            error: Error
        },
        {
            method: "",
            error: Error
        },
        {
            method: null,
            error: TypeError
        },
        {
            method: 123,
            error: TypeError
        },
        {
            method: undefined,
            error: TypeError
        }
    ])(
        "should reject unsupported payment method: $method",
        ({ method, error }) => {

            expect(() =>
                processPayment(100, method, false)
            ).toThrow(error);
        }
    );


    // TEST 5: Validate international payment flag
    test.each([
        "true",
        1,
        null,
        undefined
    ])(
        "should reject invalid international flag: %p",
        (isInternational) => {

            expect(() =>
                processPayment(100, "card", isInternational)
            ).toThrow(TypeError);
        }
    );

});
