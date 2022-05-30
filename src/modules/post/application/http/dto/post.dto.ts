export interface PostDto {
    title: string;
    content: string;
    writer: string;
    password: string;
}

export type UpdatePostDto = Pick<PostDto, 'content' | 'title'>

export interface FetchPostListDto {
    filter: Pick<PostDto, 'title' | 'writer'>;
    page: number;
    limit: number;
}