/**
 * 게시글 등록 응답
 */
export interface RegistPostResponse {
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
    readonly writer: string;

    /**
     * 생성일자
     */
    readonly created_at: Date;
}