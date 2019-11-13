import { AdviceComment } from "./AdviceComment";
import { PendingAdviceComment } from "./PendingAdviceComment";

export interface AdviceCommentRepository {
    addAdviceComment(adviceComment: PendingAdviceComment): Promise<void>;
    getCommentsForAdvice(adviceId: string): Promise<AdviceComment[]>;
}
