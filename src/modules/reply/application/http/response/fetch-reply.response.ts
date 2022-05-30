/**
 * 댓글 응답
 */
export interface FetchReplyResponse {
    /**
     * 댓글 ID
     */
    readonly id: number;

    /**
     * 게시글 ID
     */
    readonly post_id: number;

    /**
     * 내용
     */
    readonly content: string;

    /**
     * 대댓글 플래그
     */
    readonly is_child: boolean;

    /**
     * 생성일자
     */
    readonly created_at: Date;

    /**
     * 대댓글
     */
    readonly child_reply: {
        /**
         * 대댓글 ID
         */
        readonly id: number;

        /**
         * 내용
         */
        readonly content: string;

        /**
         * 생성일자
         */
        readonly created_at: Date;    
    }
}