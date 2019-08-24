import { RoleKey } from "./RoleKey";

export const RoleStructure = Object.freeze({
        [RoleKey.admin]: {
            manages: [RoleKey.provisioner, RoleKey.medicalprofessional],
        },
        [RoleKey.provisioner]: {
            manages: [RoleKey.medicalprofessional],
        },
        [RoleKey.medicalprofessional]: {
            manages: [] as RoleKey [],
        },
    });
