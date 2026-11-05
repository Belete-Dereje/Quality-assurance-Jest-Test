
import { jest } from "@jest/globals";

import { StudentRepository } from "../../src/studentRepository.js";
import { createStudentFixture } from "../fixtures/studentFixtures.js";

describe("Student Repository Tests", () => {

    let repository;

    // Create a fresh repository before every test
    beforeEach(() => {
        repository = new StudentRepository();
    });

    // Restore spies and mocks after every test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Adding Students", () => {

        test("should add a student successfully", () => {

            const student = createStudentFixture();

            const result = repository.add(student);

            expect(result).toEqual(student);
            expect(repository.count()).toBe(1);
        });

        test("should reject duplicate student IDs", () => {

            const student1 = createStudentFixture();

            const student2 = createStudentFixture({
                name: "Sara Ahmed"
            });

            repository.add(student1);

            expect(() => repository.add(student2))
                .toThrow("Student ID already exists");

            expect(repository.count()).toBe(1);
        });

        test("should allow students with different IDs", () => {

            repository.add(createStudentFixture());

            repository.add(createStudentFixture({
                id: 102,
                name: "Sara Ahmed"
            }));

            expect(repository.count()).toBe(2);
        });
    });

    describe("Finding Students", () => {

        test("should find a student using their ID", () => {

            const student = createStudentFixture();

            repository.add(student);

            expect(repository.findById(101)).toEqual(student);
        });

        test("should return undefined for a nonexistent student", () => {

            expect(repository.findById(999)).toBeUndefined();
        });
    });

    describe("Removing Students", () => {

        test("should remove a student using their ID", () => {

            repository.add(createStudentFixture());

            repository.remove(101);

            expect(repository.count()).toBe(0);
            expect(repository.findById(101)).toBeUndefined();
        });

        test("should keep other students when one is removed", () => {

            repository.add(createStudentFixture());

            repository.add(createStudentFixture({
                id: 102,
                name: "Sara Ahmed"
            }));

            repository.remove(101);

            expect(repository.count()).toBe(1);
            expect(repository.findById(102).name)
                .toBe("Sara Ahmed");
        });
    });

    describe("Test Isolation and Cleanup", () => {

        test("should start with an empty repository", () => {

            expect(repository.count()).toBe(0);
        });

        test("should allow spying on the count method", () => {

            const countSpy = jest.spyOn(repository, "count");

            repository.add(createStudentFixture());

            repository.count();

            expect(countSpy).toHaveBeenCalledTimes(1);
        });

        test("should start independently of previous tests", () => {

            expect(repository.count()).toBe(0);
        });
    });

});
