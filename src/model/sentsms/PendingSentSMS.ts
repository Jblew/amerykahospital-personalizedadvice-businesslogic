import ow from "ow--fork-by-jblew-with-catching";

export interface PendingSentSMS {
    phoneNumber: string;
    message: string;
    result: any;
    error?: string;
}

export namespace PendingSentSMS {
    export function validate(s: PendingSentSMS, namePrefix: string = "PendingSentSMS") {
        ow(s.phoneNumber, `${namePrefix}.phoneNumber`, ow.string.nonEmpty);
        ow(s.message, `${namePrefix}.message`, ow.string.nonEmpty);
        ow(s.error, `${namePrefix}.error`, ow.optional.string.nonEmpty);
    }
}
