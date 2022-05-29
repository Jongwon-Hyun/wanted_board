import { IsNotEmpty, MaxLength } from 'class-validator';

export class RegistPostRequest {
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @MaxLength(2000)
    content: string;

    @IsNotEmpty()
    @MaxLength(20)
    writer: string;

    @IsNotEmpty()
    @MaxLength(20)
    password: string;
}