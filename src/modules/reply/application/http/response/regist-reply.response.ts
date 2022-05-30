export interface RegistReplyResponse {
    readonly id: number;
    readonly post_id: number;
    readonly writer: string;
    readonly is_child: boolean;
    readonly parent_id: number;
    readonly created_at: Date;
}