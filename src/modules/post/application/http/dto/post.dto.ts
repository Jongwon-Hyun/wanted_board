export interface PostDto {
    title: string,
    content: string,
    writer: string,
    password: string,
}

export type UpdatePostDto = Pick<PostDto, 'content' | 'title'>