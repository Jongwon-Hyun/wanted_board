/**
 * 댓글 등록 DTO
 */
export interface RegistReplyDto {
    /**
     * 게시글 ID
     */
    postID: number;

    /**
     * 내용
     */
    content: string;

    /**
     * 작성자
     */
    writer: string;

    /**
     * 대댓글 플래그
     */
    isChild: boolean;

    /**
     * 대댓글의 부모 댓글 ID
     */
    parentID?: number;
}

/**
 * 댓글 목록 조회 DTO
 */
export interface FetchReplyListDto {
    /**
     * 게시글 ID
     */
    postID: number;

    /**
     * 대댓글 플래그
     */
    isChild: boolean;

    /**
     * 페이지
     */
    page: number;

    /**
     * 댓글 개수
     */
    limit: number;
}