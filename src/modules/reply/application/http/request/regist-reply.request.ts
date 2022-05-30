import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';

export class RegistReplyRequest {
    @IsNotEmpty()
    post_id: number;

    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    @IsNotEmpty()
    @MaxLength(20)
    writer: string;

    @IsNotEmpty()
    is_child: boolean;

    @ValidateIf(o => o.is_child_reply)
    @IsNotEmpty()
    parent_id: number;
}