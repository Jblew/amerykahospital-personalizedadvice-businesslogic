import { Advice } from "../../model/advice/Advice";

export interface SMSConfig {
    adviceLink: (adviceId: string) => string;
    message: (props: { advice: Advice; link: string }) => string;
    fromName: string;
}
