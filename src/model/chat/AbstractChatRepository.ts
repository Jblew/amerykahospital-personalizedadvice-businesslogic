import { Account } from "../account/Account";

import { ChatMessage } from "./ChatMessage";
import { ChatRepository } from "./ChatRepository";
import { ChatUser } from "./ChatUser";
import { PendingChatMessage } from "./PendingChatMessage";
import { PendingChatUser } from "./PendingChatUser";

export abstract class AbstractChatRepository implements ChatRepository {
    public abstract listToChannel(channel: string): Promise<ChatMessage[]>;
    public abstract listToUid(uid: string): Promise<ChatMessage[]>;
    public abstract listUsersWithRole(role: PendingChatUser.Role.Type): Promise<ChatUser[]>;

    public async addMessage(account: Account, pendingMsg: PendingChatMessage): Promise<ChatMessage> {
        const result = await Promise.all([
            this.writeChatUser({
                uid: account.uid,
                displayName: account.displayName || `user-${account.uid}`,
                lastSeenTimestampS: this.getTimestampSeconds(),
            }),
            this.writeMessage(pendingMsg),
        ]);

        return result[1];
    }

    protected abstract writeChatUser(chatUser: PendingChatUser): Promise<ChatUser>;
    protected abstract writeMessage(pendingMsg: PendingChatMessage): Promise<ChatMessage>;
    protected abstract getTimestampSeconds(): number;
}
