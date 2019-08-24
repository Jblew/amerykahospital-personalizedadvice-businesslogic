/* tslint:disable:max-classes-per-file */
import { expect } from "../_test/test_environment";

import { RoleKey } from "./RoleKey";
import { RoleStructure } from "./RoleStructure";

describe("RoleKey", () => {
    it("All roles are present in RoleStructure", () => {
        expect(RoleStructure).to.haveOwnProperty(RoleKey.admin);
        expect(RoleStructure).to.haveOwnProperty(RoleKey.provisioner);
        expect(RoleStructure).to.haveOwnProperty(RoleKey.medicalprofessional);
    });
});
