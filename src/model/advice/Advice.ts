import ow from "ow--fork-by-jblew-with-catching";

import { PendingAdvice } from "./PendingAdvice";

//
export interface Advice extends PendingAdvice {
    id: string;
    uid?: string;
    timestamp: number;
}

export namespace Advice {
    export function validate(o: Advice) {
        ow(o, "Advice", ow.object.catching(v => PendingAdvice.validate(v as Advice, "Advice")));

        ow(o.id, "Advice.id", ow.string.nonEmpty);
        ow(o.uid, "Advice.uid", ow.any(ow.undefined, ow.string.nonEmpty));
        ow(o.timestamp, "Advice.timestamp", ow.number.finite.integer.greaterThan(0));
    }

    export function isImported(advice: Advice): boolean {
        return !!advice.uid;
    }

    export type KeysType = PendingAdvice.KeysType & { [x in keyof Required<Advice>]: string };
    export const keys: KeysType = {
        ...PendingAdvice.keys,
        id: "id",
        uid: "uid",
        timestamp: "timestamp",
    };
}
