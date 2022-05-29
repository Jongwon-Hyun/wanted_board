import { IsNotEmpty, MaxLength, NotContains } from 'class-validator';

export class UpdatePostRequest {
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @MaxLength(2000)
    content: string;
}