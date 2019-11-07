// tslint:disable member-ordering
import ow from "ow--fork-by-jblew-with-catching";

import { Advice } from "../../model/advice/Advice";
import { AdviceRepository } from "../../model/advice/AdviceRepository";
import { Handler } from "../Handler";

import { ThankFunction as Fn } from "./ThankFunction";

export abstract class ThankFunctionAbstractHandler
    implements Handler<Fn.Function>, Handler<(input: any, props: { uid: string }) => any> {
    protected abstract makeInvalidInputDataError(p: { advanced: string }): Error;
    protected abstract makeAdviceDoesNotExistError(p: { advanced: string }): Error;
    protected abstract makeAdviceDoesNotBelongToUser(): Error;
    protected abstract getAdviceRepository(): AdviceRepository;

    public async handle(input: { adviceId: string }, props: { uid: string }): Promise<Fn.Result> {
        ow(props.uid, "ThankFunctionAbstractHandler.props.uid", ow.string.nonEmpty);

        const adviceId = this.getAdviceIdFromInput(input);
        const advice = await this.getAdvice(adviceId);
        await this.assertAdviceBelongsToUser(advice, props.uid);

        const newThanksCount = (advice.thanksCount || 0) + 1;
        advice.thanksCount = newThanksCount;
        await this.updateAdvice(advice);

        return { newThanksCount };
    }

    private getAdviceIdFromInput(data: { adviceId: string }): string {
        if (!data.adviceId) throw this.makeInvalidInputDataError({ advanced: "Missing adviceId" });
        return data.adviceId;
    }

    private async assertAdviceBelongsToUser(advice: Advice, uid: string) {
        if (advice.uid !== uid) throw this.makeAdviceDoesNotBelongToUser();
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
