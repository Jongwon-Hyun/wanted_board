import { IsNotEmpty, MaxLength, NotContains } from 'class-validator';

/**
 * 게시글 등록 요청
 */
export class RegistPostRequest {
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
    @MaxLength(10000)
    content: string;

    /**
     * 작성자
     */
    @IsNotEmpty()
    @MaxLength(20)
    writer: string;

    /**
     * 패스워드
     */
    @NotContains(' ')
    @IsNotEmpty()
    @MaxLength(20)
    password: string;
}