/* tslint:disable:max-classes-per-file */
import { expect } from "../_test/test_environment";

import { forbidUndefinedKeys } from "./forbid-undefined-keys";

describe("forbidUndefinedKeys()", () => {
    it("Allows empty object", () => {
        forbidUndefinedKeys({});
    });

    it("Allows classic object", () => {
        forbidUndefinedKeys({ a: 1 });
    });

    it("Allows zero value", () => {
        forbidUndefinedKeys({ a: 1, b: 0 });
    });

    it("Allows null value", () => {
        forbidUndefinedKeys({ a: 1, b: null });
    });

    it("Throws on undefined property", () => {
        expect(() => forbidUndefinedKeys({ a: 1, b: undefined })).to.throw(/Undefined properties are forbidden/);
    });
});
