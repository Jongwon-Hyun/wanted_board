export interface RegistPostDto {
    title: string;
    content: string;
    writer: string;
    password: string;
}

export type UpdatePostDto = Pick<RegistPostDto, 'content' | 'title'>

export interface FetchPostListDto {
    filter: Pick<RegistPostDto, 'title' | 'writer'>;
    page: number;
    limit: number;
}