// tslint:disable member-ordering
import { Advice } from "../../model/advice/Advice";
import { AdviceRepository } from "../../model/advice/AdviceRepository";
import { PendingAdvice } from "../../model/advice/PendingAdvice";
import { Handler } from "../Handler";

import { AddAdviceFunction as Fn } from "./AddAdviceFunction";
import { AlmostUniqueShortIdGenerator } from "./AlmostUniqueShortIdGenerator";

export abstract class AddAdviceFunctionAbstractHandler implements Handler<Fn.Function> {
    protected abstract getTimestampSeconds(): number;
    protected abstract makeInvalidInputDataError(p: { advanced: string }): Error;
    protected abstract getAdviceRepository(): AdviceRepository;

    public async handle(input: PendingAdvice): Promise<Fn.Result> {
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
}
