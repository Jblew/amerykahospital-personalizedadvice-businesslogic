// tslint:disable member-ordering
import { Advice } from "../../model/advice/Advice";
import { AdviceRepository } from "../../model/advice/AdviceRepository";
import { SentSMSRepository } from "../../model/sentsms/SentSMSRepository";
import { Handler } from "../Handler";

import { SendSMSFunction as Fn } from "./SendSMSFunction";
import { SMSConfig } from "./SMSConfig";

export abstract class SendSMSFunctionAbstractHandler implements Handler<Fn.Function> {
    protected abstract makeInvalidInputDataError(p: { advanced: string }): Error;
    protected abstract makeAdviceDoesNotExistError(p: { advanced: string }): Error;
    protected abstract makeAdviceAlreadyImportedError(): Error;
    protected abstract getAdviceRepository(): AdviceRepository;
    protected abstract getSentSMSRepository(): SentSMSRepository;
    protected abstract sendSMS(props: { phoneNumber: string; message: string; fromName: string }): Promise<any>;
    protected abstract obtainAdviceLink(adviceId: string): Promise<string>;
    protected abstract obtainDeepLink(adviceLink: string): Promise<string>;
    protected abstract getSMSConfig(): SMSConfig;

    public async handle(input: { adviceId: string }): Promise<Fn.Result> {
        const adviceId = this.getAdviceIdFromInput(input);
        const advice = await this.getAdvice(adviceId);
        await this.assertAdviceNotImportedYet(advice);

        const adviceLink = await this.obtainAdviceLink(advice.id);
        const deepLink = await this.obtainDeepLink(adviceLink);
        const message = this.generateMessage(advice, deepLink);
        const fromName = this.getSMSConfig().fromName;
        const { sentSMSId } = await this.sendSMSAndRecordState({
            phoneNumber: advice.parentPhoneNumber,
            message,
            fromName,
        });

        return {
            message,
            sentSMSId,
        };
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

    private generateMessage(advice: Advice, adviceLink: string) {
        return this.getSMSConfig().message({ advice, link: adviceLink });
    }

    private async sendSMSAndRecordState(props: {
        phoneNumber: string;
        message: string;
        fromName: string;
    }): Promise<{ sentSMSId: string }> {
        let caughtError: Error | undefined;
        let result: any = "";
        try {
            result = this.sendSMS(props);
        } catch (error) {
            caughtError = error;
        }

        await this.getSentSMSRepository().add({
            phoneNumber: props.phoneNumber,
            message: props.message,
            result: result || "-",
            ...(caughtError ? { error: caughtError.message } : {}),
        });

        throw caughtError;
    }
}