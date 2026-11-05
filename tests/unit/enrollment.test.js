
import { jest } from "@jest/globals";
import { EnrollmentManager } from "../../src/enrollment.js";

describe("Enrollment Management Tests", () => {

    let notifier;
    let manager;

    beforeEach(() => {
        notifier = {
            send: jest.fn()
        };

        manager = new EnrollmentManager(notifier);
    });

    // TEST 1: Successful enrollment
    test("should enroll a student and send a notification", () => {

        const result = manager.enroll(101, "CS301");

        expect(result).toEqual({
            studentId: 101,
            courseId: "CS301"
        });

        expect(manager.enrollments).toHaveLength(1);

        expect(notifier.send).toHaveBeenCalledTimes(1);

        expect(notifier.send).toHaveBeenCalledWith(
            101,
            "Enrolled in course CS301"
        );
    });

    // TEST 2: Reject duplicate enrollment
    test("should reject duplicate enrollment", () => {

        manager.enroll(101, "CS301");

        expect(() => manager.enroll(101, "CS301"))
            .toThrow();

        expect(manager.enrollments).toHaveLength(1);

        expect(notifier.send).toHaveBeenCalledTimes(1);
    });

    // TEST 3: Different students can enroll in the same course
    test("should allow different students to share the same course", () => {

        manager.enroll(101, "CS301");
        manager.enroll(102, "CS301");

        expect(manager.enrollments).toHaveLength(2);

        expect(manager.getEnrollments(101)).toHaveLength(1);
        expect(manager.getEnrollments(102)).toHaveLength(1);

        expect(notifier.send).toHaveBeenCalledTimes(2);
    });

    // TEST 4: Rollback when notification fails
    test("should roll back enrollment when notification fails", () => {

        const notificationError =
            new Error("Notification service unavailable");

        notifier.send.mockImplementation(() => {
            throw notificationError;
        });

        expect(() => manager.enroll(101, "CS301"))
            .toThrow(notificationError);

        expect(manager.enrollments).toHaveLength(0);
    });

    // TEST 5: Successfully unenroll a student
    test("should remove an enrollment and return true", () => {

        manager.enroll(101, "CS301");

        const result = manager.unenroll(101, "CS301");

        expect(result).toBe(true);
        expect(manager.enrollments).toHaveLength(0);
    });

    // TEST 6: Unenrollment of a nonexistent record
    test("should return false when enrollment does not exist", () => {

        const result = manager.unenroll(101, "CS301");

        expect(result).toBe(false);
        expect(manager.enrollments).toHaveLength(0);
    });

    // TEST 7: Defensive copies of enrollment records
    test("should return defensive copies from getEnrollments", () => {

        manager.enroll(101, "CS301");

        const records = manager.getEnrollments(101);

        // Modify the returned record
        records[0].courseId = "CHANGED";

        // The original record must remain unchanged
        expect(manager.getEnrollments(101)[0].courseId)
            .toBe("CS301");

        // Modifying the returned array must not affect storage
        records.push({
            studentId: 101,
            courseId: "CS302"
        });

        expect(manager.getEnrollments(101)).toHaveLength(1);
    });

    // TEST 8: Independent EnrollmentManager instances
    test("should maintain independent enrollment records", () => {

        const notifier2 = {
            send: jest.fn()
        };

        const manager2 = new EnrollmentManager(notifier2);

        manager.enroll(101, "CS301");
        manager2.enroll(102, "CS302");

        expect(manager.getEnrollments(101)).toHaveLength(1);
        expect(manager.getEnrollments(102)).toHaveLength(0);

        expect(manager2.getEnrollments(102)).toHaveLength(1);
        expect(manager2.getEnrollments(101)).toHaveLength(0);
    });

});
