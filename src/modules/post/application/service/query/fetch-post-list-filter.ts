/**
 * 게시글 목록 조회 검색 조건
 */
export interface FetchPostListFilter {
    /**
     * 제목
     */
    readonly title: string;

    /**
     * 작성자
     */
    readonly writer: string;
}