import { Advice } from "../../model/advice/Advice";

export interface SMSConfig {
    message: (props: { advice: Advice; link: string }) => string;
    fromName: string;
}
