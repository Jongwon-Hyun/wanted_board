import { IsNotEmpty, MaxLength, NotContains } from 'class-validator';

export class RegistPostRequest {
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @MaxLength(10000)
    content: string;

    @IsNotEmpty()
    @MaxLength(20)
    writer: string;

    @NotContains(' ')
    @IsNotEmpty()
    @MaxLength(20)
    password: string;
}