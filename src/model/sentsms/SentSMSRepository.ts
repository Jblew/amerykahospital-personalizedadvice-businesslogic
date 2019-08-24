
import { PendingSentSMS } from "./PendingSentSMS";
import { SentSMS } from "./SentSMS";

export interface SentSMSRepository {
    add(sentSMS: PendingSentSMS): Promise<{ id: string }>;
    get(id: string): Promise<SentSMS | undefined>;
}
