/**
 * 게시글 조회 응답
 */
export interface FetchPostResponse {
    /**
     * 게시글 ID
     */
    readonly id: number;

    /**
     * 제목
     */
    readonly title: string;
    
    /**
     * 내용
     */
    readonly content: string;
    
    /**
     * 생성일자
     */
    readonly created_at: Date;

    /** 
     * 수정일자
     */
    readonly updated_at: Date;

}