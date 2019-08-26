// tslint:disable member-ordering
import ow from "ow--fork-by-jblew-with-catching";

import { Advice } from "../../model/advice/Advice";
import { AdviceRepository } from "../../model/advice/AdviceRepository";
import { PendingAdvice } from "../../model/advice/PendingAdvice";
import { RoleKey } from "../../roles/RoleKey";
import { Handler } from "../Handler";

import { AddAdviceFunction as Fn } from "./AddAdviceFunction";
import { AlmostUniqueShortIdGenerator } from "./AlmostUniqueShortIdGenerator";

export abstract class AddAdviceFunctionAbstractHandler implements Handler<Fn.Function> {
    protected abstract getTimestampSeconds(): number;
    protected abstract makeInvalidInputDataError(p: { advanced: string }): Error;
    protected abstract makeMissingRoleError(p: { advanced: string }): Error;
    protected abstract getAdviceRepository(): AdviceRepository;
    protected abstract userHasRole(p: { uid: string; role: string }): Promise<boolean>;

    public async handle(input: PendingAdvice, props: { uid: string }): Promise<Fn.Result> {
        ow(props.uid, "AddAdviceFunctionAbstractHandler.props.uid", ow.string.nonEmpty);
        await this.assertUserIsMedicalProfessional(props.uid);

        const pendingAdvice = this.inputToPendingAdvice(input);
        const id = await this.obtainUniqueId();
        const advice = this.pendingAdviceToAdvice(pendingAdvice, id);
        await this.getAdviceRepository().addAdvice(advice);
        return {
            log: "",
            adviceId: id,
        };
    }

    private inputToPendingAdvice(data: any): PendingAdvice {
        if (data.id) throw this.makeInvalidInputDataError({ advanced: "Cannot specify an id on PendingAdvice" });
        try {
            PendingAdvice.validate(data);
        } catch (error) {
            throw this.makeInvalidInputDataError({ advanced: error.message });
        }
        return data as PendingAdvice;
    }

    private pendingAdviceToAdvice(pendingAdvice: PendingAdvice, id: string): Advice {
        return {
            ...pendingAdvice,
            id,
            timestamp: this.getTimestampSeconds(),
        };
    }

    private async obtainUniqueId(): Promise<string> {
        const checkIfAlreadyExists = (id: string) => this.getAdviceRepository().adviceExists(id);
        return AlmostUniqueShortIdGenerator.obtainUniqueId(checkIfAlreadyExists);
    }

    private async assertUserIsMedicalProfessional(uid: string) {
        const role = RoleKey.medicalprofessional;
        const hasMpRole = await this.userHasRole({ uid, role });
        if (!hasMpRole) {
            throw this.makeMissingRoleError({ advanced: `Missing role "${role}"` });
        }
    }
}
