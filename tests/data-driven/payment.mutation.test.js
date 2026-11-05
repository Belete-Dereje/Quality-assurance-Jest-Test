import { processPayment } from "../../src/payment.js";

describe("Payment Mutation Tests", () => {

    // Kills the roundMoney arithmetic mutant:
    // (amount + EPSILON) changed to (amount - EPSILON)
    test("should round 1.025 half-up to 1.03", () => {
        expect(processPayment(1, "card", false)).toBe(1.03);
    });

    // Kills the error-message mutant for an invalid amount type
    test("should use the exact amount type error message", () => {
        expect(() => processPayment("100", "card", false))
            .toThrow("Payment amount must be a number");
    });

    // Kills the error-message mutant for an invalid amount range
    test("should use the exact amount range error message", () => {
        expect(() => processPayment(0, "card", false))
            .toThrow("Payment amount must be positive and finite");
    });

    // Kills the error-message mutant for an invalid method type
    test("should use the exact method type error message", () => {
        expect(() => processPayment(100, null, false))
            .toThrow("Payment method must be a string");
    });

    // Kills the error-message mutant for an unsupported method
    test("should use the exact unsupported method error message", () => {
        expect(() => processPayment(100, "cash", false))
            .toThrow("Unsupported payment method");
    });

    // Kills the error-message mutant for an invalid international flag
    test("should use the exact international flag error message", () => {
        expect(() => processPayment(100, "card", "true"))
            .toThrow("International payment flag must be a Boolean");
    });

    // Confirms the card international fee produces the correct total
    test("should calculate the card international total", () => {
        expect(processPayment(1, "card", true)).toBe(1.04);
    });

    // Confirms the bank international fee produces the correct total
    test("should calculate the bank international total", () => {
        expect(processPayment(100, "bank", true)).toBe(111.5);
    });
});
