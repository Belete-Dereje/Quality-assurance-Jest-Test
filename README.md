# University Testing Lab

Advanced Jest unit testing laboratory project for the Quality Assurance course.
## Group 10
## Group Members

| Name | ID |
|---|---|
| Henok Kebede | 1601252 |
| Belete Dereje | 1601435 |
| Mahlet Abebe | 1601322 |

## About the Project

This project contains simple JavaScript modules for a university system and a
Jest test suite for each module. It demonstrates:

- Unit testing with Jest
- Test isolation and lifecycle hooks
- Data-driven testing with `test.each()` and `describe.each()`
- Mocking with `jest.fn()`
- Code coverage and coverage thresholds
- Mutation testing with StrykerJS

The test suite covers all 14 laboratory questions from the
`Jest Unit Testing Lab Exercise.pdf` worksheet.

## Project Structure

```text
university-testing-lab/
  src/                 Source modules
  tests/
    unit/              Unit tests
    lifecycle/         Lifecycle hook tests
    data-driven/       Parameterized tests
    coverage/          Coverage improvement tests
    mutation/          Eligibility mutant tests
    fixtures/          Shared test data
  reports/             Test, coverage, and mutation reports
  coverage/            Generated HTML coverage report
  jest.config.js       Jest configuration
  stryker.config.js    Stryker configuration for scholarship
  stryker.payment.config.js  Stryker configuration for payment
```

## Installation

```bash
npm install
```

## Running the Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Mutation testing for scholarship eligibility
npm run mutation:scholarship

# Mutation testing for payment processing
npm run mutation:payment
```

## Results

- 13 test suites and 310 tests pass.
- Coverage: 99.18% statements, 98.19% branches, 100% functions, 99.18% lines.
- Scholarship mutation score: 93.69%.
- Payment mutation score: 98.33%.

Detailed before-and-after evidence is available in the `reports/` directory.
