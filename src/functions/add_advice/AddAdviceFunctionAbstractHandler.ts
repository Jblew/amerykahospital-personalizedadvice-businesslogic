// tslint:disable member-ordering
import { Advice } from "../../model/advice/Advice";
import { PendingAdvice } from "../../model/advice/PendingAdvice";
import { Handler } from "../Handler";

import { AddAdviceFunction as Fn } from "./AddAdviceFunction";

export abstract class AddAdviceFunctionAbstractHandler implements Handler<Fn.Function> {
    protected abstract obtainUniqueId(): Promise<string>;
    protected abstract getTimestampSeconds(): number;
    protected abstract makeInvalidInputDataError(p: { advanced: string }): Error;
    protected abstract addAdvice(advice: Advice): Promise<void>;

    public async handle(input: PendingAdvice): Promise<Fn.Result> {
        const pendingAdvice = this.inputToPendingAdvice(input);
        const id = await this.obtainUniqueId();
        const advice = this.pendingAdviceToAdvice(pendingAdvice, id);
        await this.addAdvice(advice);
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
}
