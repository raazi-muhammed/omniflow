import { describe, expect, test } from "@jest/globals";

function sum() {
    return 4;
}

describe("sum module", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(sum()).toBe(4);
    });
});
