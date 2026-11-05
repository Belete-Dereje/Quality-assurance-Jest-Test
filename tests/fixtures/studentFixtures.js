
export function createStudentFixture(overrides = {}) {
    return {
        id: 101,
        name: "Abebe Kebede",
        department: "Computer Science",
        ...overrides
    };
}
