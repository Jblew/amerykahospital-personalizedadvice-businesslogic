import { Account } from "../account/Account";

import { ChatMessage } from "./ChatMessage";
import { ChatUser } from "./ChatUser";
import { PendingChatMessage } from "./PendingChatMessage";
import { PendingChatUser } from "./PendingChatUser";

export interface ChatRepository {
    addMessage(account: Account, pendingMsg: PendingChatMessage): Promise<ChatMessage>;
    listToChannel(channel: string): Promise<ChatMessage[]>;
    listToUid(uid: string): Promise<ChatMessage[]>;
    listUsersWithRole(role: PendingChatUser.Role.Type): Promise<ChatUser[]>;
    listenForMessagesToChannel(
        channel: string,
        callback: ChatRepository.MessageCallback,
    ): { cancel: ChatRepository.CancelListeningFn };
    listenForMessagesToUid(
        uid: string,
        callback: ChatRepository.MessageCallback,
    ): { cancel: ChatRepository.CancelListeningFn };
}

export namespace ChatRepository {
    export type CancelListeningFn = () => void;
    export type MessageCallback = (msg: ChatMessage) => void;
}
