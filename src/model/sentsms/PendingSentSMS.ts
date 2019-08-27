import ow from "ow--fork-by-jblew-with-catching";

export interface PendingSentSMS {
    phoneNumber: string;
    message: string;
    result: string | object;
    error?: string;
    test?: boolean;
}

export namespace PendingSentSMS {
    export function validate(s: PendingSentSMS, namePrefix: string = "PendingSentSMS") {
        ow(s.phoneNumber, `${namePrefix}.phoneNumber`, ow.string.nonEmpty);
        ow(s.message, `${namePrefix}.message`, ow.string.nonEmpty);
        ow(s.error, `${namePrefix}.error`, ow.optional.string.nonEmpty);
        ow(s.result, `${namePrefix}.result`, ow.optional.any(ow.object, ow.string));
        ow(s.test, `${namePrefix}.test`, ow.optional.boolean);
    }
}
