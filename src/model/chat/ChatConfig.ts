import ow from "ow--fork-by-jblew-with-catching";

export interface ChatConfig {
    defaultChannel: string;
}

export namespace ChatConfig {
    export function validate(c: ChatConfig) {
        ow(c, "ChatConfig", ow.object);
        ow(c.defaultChannel, "ChatConfig.defaultChannel", ow.string.nonEmpty);
    }
}
