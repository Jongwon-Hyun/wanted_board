export interface PostDto {
    title: string,
    content: string,
    writer: string,
    password: string,
}

type UpdatePostDto = Pick<PostDto, 'content' | 'title'>