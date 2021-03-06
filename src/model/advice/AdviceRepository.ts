import ow from "ow--fork-by-jblew-with-catching";

import { Advice } from "./Advice";

export interface AdviceRepository {
    addAdvice(advice: Advice): Promise<void>;
    getAdvice(id: string): Promise<Advice | undefined>;
    adviceExists(id: string): Promise<boolean>;
    fetchAdvices(filter: AdviceRepository.FetchFilter): Promise<Advice[]>;
}

export namespace AdviceRepository {
    export interface FetchFilter {
        authorUid?: string;
        medicalprofessionalName?: string;
        patientName?: string;
        evidenceHash?: string;
        parentPhoneNumber?: string;
    }

    export namespace FetchFilter {
        export function validate(f: FetchFilter) {
            ow(f, "FetchFilter", ow.object);
            ow(f.authorUid, "FetchFilter.authorUid", ow.optional.string.nonEmpty);
            ow(f.medicalprofessionalName, "FetchFilter.medicalprofessionalName", ow.optional.string);
            ow(f.patientName, "FetchFilter.patientName", ow.optional.string);
            ow(f.evidenceHash, "FetchFilter.evidenceHash", ow.optional.string);
            ow(f.parentPhoneNumber, "FetchFilter.parentPhoneNumber", ow.optional.string);
        }
    }
}
