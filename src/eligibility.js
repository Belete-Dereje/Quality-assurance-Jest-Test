// Original eligibility rule used for the mutation-testing exercise
export function checkEligibility(age, score, hasDocument) {
    if (age >= 18 && score >= 60 && hasDocument) {
        return "Eligible";
    }

    return "Not Eligible";
}
