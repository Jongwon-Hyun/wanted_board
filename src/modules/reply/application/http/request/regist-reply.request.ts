import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';

/**
 * 댓글 등록 요청
 */
export class RegistReplyRequest {
    /**
     * 게시글 ID
     */
    @IsNotEmpty()
    post_id: number;

    /**
     * 내용
     */
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    /**
     * 작성자
     */
    @IsNotEmpty()
    @MaxLength(20)
    writer: string;

    /**
     * 대댓글 플래그
     */
    @IsNotEmpty()
    is_child: boolean;

    /**
     * 대댓글의 부모 댓글 ID
     * 대댓글의 경우만 빈 값 체크
     */
    @ValidateIf(o => o.is_child_reply)
    @IsNotEmpty()
    parent_id: number;
}