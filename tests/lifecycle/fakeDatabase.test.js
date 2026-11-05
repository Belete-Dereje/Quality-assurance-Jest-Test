
import { jest } from "@jest/globals";
import { FakeDatabase } from "../../src/fakeDatabase.js";

describe("FakeDatabase Lifecycle Tests", () => {

    let database;
    let disconnectSpy;

    // Shared event log accessible to parent and nested tests
    const events = [];

    // Execute once before all tests
    beforeAll(() => {
        database = new FakeDatabase();
        database.connect();

        disconnectSpy = jest.spyOn(database, "disconnect");
    });

    // Execute before every test
    beforeEach(() => {
        database.records = [];
    });

    // Execute once after all tests
    afterAll(() => {
        database.disconnect();

        expect(disconnectSpy).toHaveBeenCalledTimes(1);
        expect(database.connected).toBe(false);

        disconnectSpy.mockRestore();
    });

    // TEST 1: Database connection
    test("should connect successfully before tests", () => {
        expect(database.connected).toBe(true);
    });

    // TEST 2: Successful insertion
    test("should insert a record when connected", () => {
        const student = {
            id: 101,
            name: "Abebe"
        };

        database.insert(student);

        expect(database.records).toHaveLength(1);
        expect(database.records[0]).toEqual(student);
    });

    // TEST 3: Reject insertion when disconnected
    test("should reject insertion when database is disconnected", () => {
        const disconnectedDatabase = new FakeDatabase();

        expect(disconnectedDatabase.connected).toBe(false);

        expect(() => {
            disconnectedDatabase.insert({
                id: 102,
                name: "Sara"
            });
        }).toThrow("Database not connected");

        expect(disconnectedDatabase.records).toHaveLength(0);
    });

    // TEST 4: No record leakage
    test("should start with empty records for every test", () => {
        expect(database.records).toEqual([]);
    });

    // TEST 5: Reset records between tests
    test("should not contain records from previous tests", () => {
        expect(database.records).toHaveLength(0);

        database.insert({
            id: 103,
            name: "Meron"
        });

        expect(database.records).toHaveLength(1);
    });

    // NESTED DESCRIBE: Lifecycle Hook Order
    describe("Nested Lifecycle Hook Order", () => {

        beforeAll(() => {
            events.push("Nested beforeAll");
        });

        beforeEach(() => {
            events.push("Nested beforeEach");
        });

        afterEach(() => {
            events.push("Nested afterEach");
        });

        afterAll(() => {
            events.push("Nested afterAll");
        });

        test("should execute the first nested test", () => {
            events.push("First test");

            expect(events).toEqual([
                "Nested beforeAll",
                "Nested beforeEach",
                "First test"
            ]);
        });

        test("should execute the second nested test in order", () => {
            events.push("Second test");

            expect(events).toEqual([
                "Nested beforeAll",
                "Nested beforeEach",
                "First test",
                "Nested afterEach",
                "Nested beforeEach",
                "Second test"
            ]);
        });
    });

    // TEST 6: Verify complete nested hook order
    test("should verify the complete nested lifecycle order", () => {

        expect(events).toEqual([
            "Nested beforeAll",
            "Nested beforeEach",
            "First test",
            "Nested afterEach",
            "Nested beforeEach",
            "Second test",
            "Nested afterEach",
            "Nested afterAll"
        ]);
    });

});
