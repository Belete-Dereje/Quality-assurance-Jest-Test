# Question 13 - First-Order and Higher-Order Mutant Investigation

## Original rule

`src/eligibility.js` implements the rule:

```js
if (age >= 18 && score >= 60 && hasDocument) return "Eligible";
return "Not Eligible";
```

Valid input ranges used in the baseline tests:

- `age`: integers from 0 to 120
- `score`: integers from 0 to 100
- `hasDocument`: Boolean

## Baseline tests

`tests/mutation/eligibility.test.js` contains 50 baseline cases built from these
boundary values:

- Ages: `0, 17, 18, 19, 120`
- Scores: `0, 59, 60, 61, 100`
- `hasDocument`: `true, false`

Each case compares `checkEligibility()` with an independent decision rule.
Result: **50 baseline tests passed**.

## Mutant matrix

A mutant is killed when its output differs from the original output for the
same valid input.

| Mutant | Order | Change | Killing input (age, score, hasDocument) | Original output | Mutant output | Status |
|---|---|---|---|---|---|---|
| M1 | First | `age >= 18` changed to `age > 18` | 18, 60, true | Eligible | Not Eligible | Killed |
| M2 | First | `score >= 60` changed to `score > 60` | 18, 60, true | Eligible | Not Eligible | Killed |
| M3 | First | First `&&` changed to `\|\|` | 20, 10, true | Not Eligible | Eligible | Killed |
| M4 | Second | Both relational operators changed to `>` | 18, 60, true | Eligible | Not Eligible | Killed |
| M5 | Third | Both relational operators changed to `>` and `&&` changed to `\|\|` | 10, 10, true | Not Eligible | Eligible | Killed |

## Interaction explanation

- **M1** is only different when `age` is exactly 18.
- **M2** is only different when `score` is exactly 60.
- **M3** is different when one academic condition is true but the other is false;
  the `||` operator makes the combined result true.
- **M4** combines both relational changes, so it is still only exposed by the
  exact boundary values 18 and 60.
- **M5** combines both relational changes with the logical change. The `||`
  operators make many more inputs eligible; for example, a student with
  `hasDocument = true` becomes eligible regardless of age or score.

## Test result

- Baseline tests: **50 passed**
- Mutant tests: **5 passed**
- Total for `tests/mutation/eligibility.test.js`: **55 passed**
