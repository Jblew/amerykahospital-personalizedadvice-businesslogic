import ow from "ow--fork-by-jblew-with-catching";

import { PendingSentSMS } from "./PendingSentSMS";

export interface SentSMS extends PendingSentSMS {
    id: string;
    timestamp: number;
}

export namespace SentSMS {
    export function validate(s: SentSMS) {
        PendingSentSMS.validate(s, "SentSMS");
        ow(s.id, "SentSMS.id", ow.string.nonEmpty);
        ow(s.timestamp, "SentSMS.timestamp", ow.number.finite.integer.positive);
    }
}
