// First-order mutant 1: age >= 18 becomes age > 18
export function ageMutant(age, score, hasDocument) {
    if (age > 18 && score >= 60 && hasDocument) {
        return "Eligible";
    }

    return "Not Eligible";
}

// First-order mutant 2: score >= 60 becomes score > 60
export function scoreMutant(age, score, hasDocument) {
    if (age >= 18 && score > 60 && hasDocument) {
        return "Eligible";
    }

    return "Not Eligible";
}

// First-order mutant 3: the first && becomes ||
export function logicalMutant(age, score, hasDocument) {
    if ((age >= 18 || score >= 60) && hasDocument) {
        return "Eligible";
    }

    return "Not Eligible";
}

// Second-order mutant: both relational operators change
export function secondOrderMutant(age, score, hasDocument) {
    if (age > 18 && score > 60 && hasDocument) {
        return "Eligible";
    }

    return "Not Eligible";
}

// Third-order mutant: both relational operators and the && operator change
export function thirdOrderMutant(age, score, hasDocument) {
    if (age > 18 || score > 60 || hasDocument) {
        return "Eligible";
    }

    return "Not Eligible";
}
