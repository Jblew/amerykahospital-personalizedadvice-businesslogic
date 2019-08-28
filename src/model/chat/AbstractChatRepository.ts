import { Account } from "../account/Account";

import { ChatMessage } from "./ChatMessage";
import { ChatRepository } from "./ChatRepository";
import { ChatUser } from "./ChatUser";
import { PendingChatMessage } from "./PendingChatMessage";

export abstract class AbstractChatRepository implements ChatRepository {
    public abstract listToChannel(channel: string): Promise<ChatMessage[]>;
    public abstract listToUid(uid: string): Promise<ChatMessage[]>;
    public abstract listUsersWithRole(role: ChatUser.Role.Type): Promise<ChatUser[]>;
    public abstract listenForMessagesToChannel(
        channel: string,
        callback: ChatRepository.MessageCallback,
    ): { cancel: ChatRepository.CancelListeningFn };
    public abstract listenForMessagesToUid(
        uid: string,
        callback: ChatRepository.MessageCallback,
    ): { cancel: ChatRepository.CancelListeningFn };

    public async addMessage(account: Account, pendingMsg: PendingChatMessage): Promise<ChatMessage> {
        const result = await Promise.all([
            this.writeChatUser({
                id: account.uid,
                uid: account.uid,
                displayName: account.displayName || `user-${account.uid}`,
                lastSeenTimestampMs: this.getTimestampMs(),
            }),
            this.writeMessage(pendingMsg),
        ]);

        return result[1];
    }

    protected abstract writeChatUser(chatUser: ChatUser): Promise<ChatUser>;
    protected abstract writeMessage(pendingMsg: PendingChatMessage): Promise<ChatMessage>;
    protected abstract getTimestampMs(): number;
}
