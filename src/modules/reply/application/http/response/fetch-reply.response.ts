export interface FetchReplyResponse {
    readonly id: number;
    readonly post_id: number;
    readonly content: string;
    readonly is_child: boolean;
    readonly created_at: Date;
    readonly child_reply: {
        readonly id: number;
        readonly content: string;
        readonly created_at: Date;    
    }
}