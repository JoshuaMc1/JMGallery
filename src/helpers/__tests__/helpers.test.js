describe("initials", () => {
    it("should return the initials of a full name", () => {
        expect(initials("John Doe")).toEqual("JD");
        expect(initials("Jane Smith")).toEqual("JS");
        expect(initials("Bob Johnson")).toEqual("BJ");
    });

    it("should handle empty input", () => {
        expect(initials("")).toEqual("");
    });

    it("should handle single-word input", () => {
        expect(initials("John")).toEqual("J");
    });

    it("should handle input with extra spaces", () => {
        expect(initials("  John   Doe  ")).toEqual("JD");
    });

    it("should handle input with non-letter characters", () => {
        expect(initials("John-Doe")).toEqual("JD");
        expect(initials("John123 Doe")).toEqual("JD");
    });
});

describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('world')).toBe('World');
        expect(capitalize('')).toBe('');
    });

    it('should handle non-string inputs', () => {
        expect(capitalize(null)).toBeNull();
        expect(capitalize(undefined)).toBeUndefined();
        expect(capitalize(123)).toBe('123');
        expect(capitalize(true)).toBe('True');
        expect(capitalize(false)).toBe('False');
        expect(capitalize({})).toBe('[object Object]');
        expect(capitalize([])).toBe('');
    });
});
