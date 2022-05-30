export interface RegistReplyDto {
    postID: number;
    content: string;
    writer: string;
    isChild: boolean;
    parentID?: number;
}

export interface FetchReplyListDto {
    postID: number;
    isChild: boolean;
    page: number;
    limit: number;
}