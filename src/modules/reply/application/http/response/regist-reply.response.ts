/**
 * 댓글 등록 응답
 */
export interface RegistReplyResponse {
    /**
     * 댓글 ID
     */
    readonly id: number;

    /**
     * 게시글 ID
     */
    readonly post_id: number;

    /**
     * 작성자
     */
    readonly writer: string;

    /**
     * 대댓글 플래그
     */
    readonly is_child: boolean;

    /**
     * 대댓글의 부모 댓글 ID
     */
    readonly parent_id: number;

    /**
     * 생성일자
     */
    readonly created_at: Date;
}