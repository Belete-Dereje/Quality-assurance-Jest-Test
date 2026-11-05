
import { registerStudent } from "../../src/registration.js";

describe("Student Registration Tests", () => {

    const validStudent = {
        id: 101,
        name: " Abebe Kebede ",
        age: 22,
        email: "ABEBE@example.com"
    };

    // TEST 1: Valid registration
    test("should register a student successfully", () => {
        const result = registerStudent(validStudent);

        expect(result).toEqual({
            id: 101,
            name: "Abebe Kebede",
            age: 22,
            email: "abebe@example.com",
            status: "Registered"
        });
    });

    // TEST 2: Age 17 must be rejected
    test("should reject a student aged 17", () => {
        expect(() =>
            registerStudent({ ...validStudent, age: 17 })
        ).toThrow(RangeError);
    });

    // TEST 3: Age 18 must be accepted
    test("should accept a student aged 18", () => {
        const result = registerStudent({
            ...validStudent,
            age: 18
        });

        expect(result.age).toBe(18);
    });

    // TEST 4: Age 120 must be accepted
    test("should accept a student aged 120", () => {
        const result = registerStudent({
            ...validStudent,
            age: 120
        });

        expect(result.age).toBe(120);
    });

    // TEST 5: Age above 120 must be rejected
    test("should reject age above 120", () => {
        expect(() =>
            registerStudent({ ...validStudent, age: 121 })
        ).toThrow();
    });

    // TEST 6: Decimal age must be rejected
    test("should reject decimal age", () => {
        expect(() =>
            registerStudent({ ...validStudent, age: 20.5 })
        ).toThrow();
    });

    // TEST 7: Blank name must be rejected
    test("should reject blank student names", () => {
        expect(() =>
            registerStudent({ ...validStudent, name: "   " })
        ).toThrow("Student name is required");
    });

    // TEST 8: Missing name must be rejected
    test("should reject a missing student name", () => {
        const student = { ...validStudent };
        delete student.name;

        expect(() => registerStudent(student))
            .toThrow("Student name is required");
    });

    // TEST 9: Incorrect name type must be rejected
    test("should reject a non-string student name", () => {
        expect(() =>
            registerStudent({ ...validStudent, name: 123 })
        ).toThrow(TypeError);
    });

    // TEST 10: Malformed email must be rejected
    test("should reject malformed email addresses", () => {
        expect(() =>
            registerStudent({ ...validStudent, email: "abc@" })
        ).toThrow("Invalid email");
    });

    // TEST 11: Email without a domain must be rejected
    test("should reject email without a valid domain", () => {
        expect(() =>
            registerStudent({
                ...validStudent,
                email: "student@example"
            })
        ).toThrow();
    });

    // TEST 12: Missing email must be rejected
    test("should reject missing email", () => {
        const student = { ...validStudent };
        delete student.email;

        expect(() => registerStudent(student))
            .toThrow(TypeError);
    });

    // TEST 13: Incorrect email type must be rejected
    test("should reject non-string email", () => {
        expect(() =>
            registerStudent({ ...validStudent, email: 123 })
        ).toThrow(TypeError);
    });

    // TEST 14: Missing ID must be rejected
    test("should reject missing student ID", () => {
        const student = { ...validStudent };
        delete student.id;

        expect(() => registerStudent(student))
            .toThrow(TypeError);
    });

    // TEST 15: Zero ID must be rejected
    test("should reject zero as student ID", () => {
        expect(() =>
            registerStudent({ ...validStudent, id: 0 })
        ).toThrow(RangeError);
    });

    // TEST 16: String ID must be rejected
    test("should reject string student ID", () => {
        expect(() =>
            registerStudent({ ...validStudent, id: "ABC" })
        ).toThrow(TypeError);
    });

    // TEST 17: Decimal ID must be rejected
    test("should reject decimal student ID", () => {
        expect(() =>
            registerStudent({ ...validStudent, id: 1.5 })
        ).toThrow(RangeError);
    });

    // TEST 18: Unsafe integer ID must be rejected
    test("should reject unsafe integer student ID", () => {
        expect(() =>
            registerStudent({
                ...validStudent,
                id: Number.MAX_SAFE_INTEGER + 1
            })
        ).toThrow(RangeError);
    });
    
    // TEST 19: Original input object must remain unchanged
    test("should not modify the original student object", () => {
        const student = { ...validStudent };
        const original = { ...student };

        registerStudent(student);

        expect(student).toStrictEqual(original);
    });

    // TEST 20: Difference between toEqual() and toStrictEqual()
    test("should demonstrate toEqual and toStrictEqual", () => {
        const actual = {
            student: {
                id: 101,
                name: "Abebe"
            }
        };

        const expected = {
            student: {
                id: 101,
                name: "Abebe",
                nickname: undefined
            }
        };

        expect(actual).toEqual(expected);
        expect(actual).not.toStrictEqual(expected);
    });



});
