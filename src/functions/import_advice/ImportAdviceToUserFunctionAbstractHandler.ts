// tslint:disable member-ordering
import { Advice } from "../../model/advice/Advice";
import { AdviceRepository } from "../../model/advice/AdviceRepository";
import { Handler } from "../Handler";

import { ImportAdviceToUserFunction as Fn } from "./ImportAdviceToUserFunction";

export abstract class ImportAdviceToUserFunctionAbstractHandler implements Handler<Fn.Function> {
    protected abstract getAccountUid(): string;
    protected abstract makeInvalidInputDataError(p: { advanced: string }): Error;
    protected abstract makeAdviceDoesNotExistError(p: { advanced: string }): Error;
    protected abstract makeAdviceAlreadyImportedError(): Error;
    protected abstract getAdviceRepository(): AdviceRepository;

    public async handle(input: { adviceId: string }): Promise<Fn.Result> {
        const uid = this.getAccountUid();
        const adviceId = this.getAdviceIdFromInput(input);
        const advice = await this.getAdvice(adviceId);

        await this.assertAdviceNotImportedYet(advice);
        advice.uid = uid;
        await this.updateAdvice(advice);

        return { advice, log: "" };
    }

    private getAdviceIdFromInput(data: { adviceId: string }): string {
        if (!data.adviceId) throw this.makeInvalidInputDataError({ advanced: "Missing adviceId" });
        return data.adviceId;
    }

    private async assertAdviceNotImportedYet(advice: Advice) {
        if (advice.uid) throw this.makeAdviceAlreadyImportedError();
    }

    private async getAdvice(adviceId: string): Promise<Advice> {
        const advice = await this.getAdviceRepository().getAdvice(adviceId);
        if (advice) {
            return advice;
        } else {
            throw this.makeAdviceDoesNotExistError({ advanced: `Advice id "${adviceId}"` });
        }
    }

    private async updateAdvice(advice: Advice) {
        await this.getAdviceRepository().addAdvice(advice);
    }
}
