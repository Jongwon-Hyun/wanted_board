/**
 * 게시글 등록 DTO
 */
export interface RegistPostDto {
    /**
     * 제목
     */
    title: string;

    /**
     * 내용
     */
    content: string;

    /**
     * 작성자
     */
    writer: string;

    /**
     * 패스워드
     */
    password: string;
}

/**
 * 게시글 수정 DTO
 */
export type UpdatePostDto = Pick<RegistPostDto, 'content' | 'title'>

/**
 * 게시글 목록 조회 DTO
 */
export interface FetchPostListDto {
    /**
     * 검색 조건
     */
    filter: Pick<RegistPostDto, 'title' | 'writer'>;

    /**
     * 페이지
     */
    page: number;

    /**
     * 게시글 개수
     */
    limit: number;
}