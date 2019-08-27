// tslint:disable member-ordering
import ow from "ow--fork-by-jblew-with-catching";

import { Advice } from "../../model/advice/Advice";
import { AdviceRepository } from "../../model/advice/AdviceRepository";
import { SentSMSRepository } from "../../model/sentsms/SentSMSRepository";
import { RoleKey } from "../../roles/RoleKey";
import { Handler } from "../Handler";

import { SendSMSFunction as Fn } from "./SendSMSFunction";
import { SMSConfig } from "./SMSConfig";

export abstract class SendSMSFunctionAbstractHandler implements Handler<Fn.Function> {
    protected abstract makeInvalidInputDataError(p: { advanced: string }): Error;
    protected abstract makeAdviceDoesNotExistError(p: { advanced: string }): Error;
    protected abstract makeAdviceAlreadyImportedError(): Error;
    protected abstract makeMissingRoleError(p: { role: string }): Error;
    protected abstract getAdviceRepository(): AdviceRepository;
    protected abstract getSentSMSRepository(): SentSMSRepository;
    protected abstract sendSMS(
        props: { phoneNumber: string; message: string; fromName: string },
    ): Promise<string | object>;
    protected abstract obtainDeepLink(adviceLink: string): Promise<string>;
    protected abstract getSMSConfig(): SMSConfig;
    protected abstract userHasRole(p: { uid: string; role: string }): Promise<boolean>;

    public async handle(input: { adviceId: string }, props: { uid: string }): Promise<Fn.Result> {
        ow(props.uid, "SendSMSFunctionAbstractHandler.props.uid", ow.string.nonEmpty);
        await this.assertUserIsMedicalProfessional(props.uid);

        const adviceId = this.getAdviceIdFromInput(input);
        const advice = await this.getAdvice(adviceId);
        await this.assertAdviceNotImportedYet(advice);

        const adviceLink = this.getAdviceLink(advice.id);
        const deepLink = await this.obtainDeepLink(adviceLink);
        const message = this.generateMessage(advice, deepLink);

        const { sentSMSId } = await this.sendSMSAndRecordState({
            phoneNumber: advice.parentPhoneNumber,
            message,
            fromName: this.getSMSConfig().fromName,
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

    private getAdviceLink(adviceId: string): string {
        return this.getSMSConfig().adviceLink(adviceId);
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
        let result: string | object = "";
        try {
            result = await this.sendSMS(props);
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

    private async assertUserIsMedicalProfessional(uid: string) {
        const role = RoleKey.medicalprofessional;
        const hasMpRole = await this.userHasRole({ uid, role });
        if (!hasMpRole) {
            throw this.makeMissingRoleError({ role });
        }
    }
}
