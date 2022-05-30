import { IsNotEmpty, MaxLength } from 'class-validator';

/**
 * 게시글 수정 요청
 */
export class UpdatePostRequest {
    /**
     * 제목
     */
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    /**
     * 내용
     */
    @IsNotEmpty()
    @MaxLength(2000)
    content: string;
}