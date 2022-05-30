/**
 * 페이징 응답객체
 */
export interface Pagination {
    /**
     * 페이지
     */
    readonly page: number;

    /**
     * 표시 개수
     */
    readonly limit: number;

    /**
     * 전체 개수
     */
    readonly total_count: number;
}