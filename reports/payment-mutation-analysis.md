# Question 14 - Mutation Score Improvement Project (Payment)

## Configuration

StrykerJS is configured in `stryker.payment.config.js` to mutate only
`src/payment.js`. The command is:

```bash
npm run mutation:payment
```

The Jest payment tests passed before mutation testing started.

## Initial result

Report: `reports/mutation/payment-initial.json`

| Mutants | Killed | Timeout | Survived | No coverage | Mutation score |
|---|---:|---:|---:|---:|---:|
| 60 | 53 | 0 | 7 | 0 | 88.33% |

Manual calculation:

```text
(53 + 0) / (53 + 0 + 7 + 0) * 100 = 88.33%
```

This matches the StrykerJS result.

### Initial survivor classification

| Stryker ID | Category | Line | Mutation | Status |
|---|---|---:|---|---|
| 3 | Fee arithmetic (rounding) | 32 | `amount + Number.EPSILON` changed to `amount - Number.EPSILON` | Survived |
| 11 | Amount error message | 39 | Error text replaced with `""` | Survived |
| 21 | Amount error message | 45 | Error text replaced with `""` | Survived |
| 28 | Payment-method error | 51 | Method type error text replaced with `""` | Survived |
| 40 | Payment-method error | 56 | Unsupported-method error text replaced with `""` | Survived |
| 47 | International-flag error | 62 | Flag error text replaced with `""` | Survived |
| 54 | Payment-method branch | 72 | `else if (method === "bank")` changed to `else if (true)` | Survived |

All mutants for the international fee arithmetic itself (line 78) were killed
by the original suite. No international-fee arithmetic mutant survived.

## Eight targeted tests added

File: `tests/data-driven/payment.mutation.test.js`

| Test | Input | Expected | Survivor targeted |
|---|---|---|---|
| Round half-up | amount 1, card, domestic | 1.03 | ID 3 (rounding arithmetic) |
| Amount type message | amount `"100"`, card, domestic | TypeError with exact message | ID 11 |
| Amount range message | amount 0, card, domestic | RangeError with exact message | ID 21 |
| Method type message | method `null` | TypeError with exact message | ID 28 |
| Unsupported method message | method `"cash"` | Error with exact message | ID 40 |
| International flag message | flag `"true"` | TypeError with exact message | ID 47 |
| Card international total | amount 1, card, international | 1.04 | Fee arithmetic |
| Bank international total | amount 100, bank, international | 111.5 | Fee arithmetic |

All eight tests passed before the final mutation run.

## Final result

Report: `reports/mutation/payment-final.json`

| Mutants | Killed | Timeout | Survived | No coverage | Mutation score |
|---|---:|---:|---:|---:|---:|
| 60 | 59 | 0 | 1 | 0 | 98.33% |

Manual calculation:

```text
(59 + 0) / (59 + 0 + 1 + 0) * 100 = 98.33%
```

This matches the StrykerJS result.

### Final survivor

| Stryker ID | Line | Mutation | Status | Justification |
|---|---|---:|---|---|
| 54 | 72 | `else if (method === "bank")` changed to `else if (true)` | Survived (equivalent) | The validation above the branch rejects every method except `"card"` and `"bank"`. When the method is `"card"`, the first branch runs. When it is `"bank"`, both the original and the mutant condition are true. No valid input can distinguish this mutant, so it is an equivalent mutant under the specified business rules. |

## Before and after

| Metric | Initial | Final |
|---|---:|---:|
| Killed | 53 | 59 |
| Survived | 7 | 1 |
| Mutation score | 88.33% | 98.33% |

The only remaining survivor is the justified equivalent mutant, so the suite
now detects every meaningful mutant in `src/payment.js`.
