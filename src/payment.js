
// export function processPayment(amount, method, isInternational) {

//     if (amount <= 0) {
//         throw new Error("Invalid amount");
//     }

//     let fee = 0;

//     if (method === "card") {
//         fee = amount * 0.025;
//     }
//     else if (method === "bank") {
//         fee = 10;
//     }
//     else {
//         throw new Error("Unsupported payment method");
//     }

//     if (isInternational) {
//         fee += amount * 0.015;
//     }

//     return amount + fee;
// }



//After Correction

function roundMoney(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function processPayment(amount, method, isInternational) {

    // 1. Validate payment amount type
    if (typeof amount !== "number") {
        throw new TypeError("Payment amount must be a number");
    }

    // 2. Validate payment amount range
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new RangeError(
            "Payment amount must be positive and finite"
        );
    }

    // 3. Validate payment method type
    if (typeof method !== "string") {
        throw new TypeError("Payment method must be a string");
    }

    // 4. Validate supported payment methods
    if (method !== "card" && method !== "bank") {
        throw new Error("Unsupported payment method");
    }

    // 5. Validate international flag
    if (typeof isInternational !== "boolean") {
        throw new TypeError(
            "International payment flag must be a Boolean"
        );
    }

    // 6. Calculate payment fee
    let fee = 0;

    if (method === "card") {
        fee = amount * 0.025;
    }
    else if (method === "bank") {
        fee = 10;
    }

    // 7. Add international transaction fee
    if (isInternational) {
        fee += amount * 0.015;
    }

    // 8. Round the final payment to two decimal places
    return roundMoney(amount + fee);
}
