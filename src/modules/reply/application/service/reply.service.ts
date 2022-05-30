import { Bcrypt } from "@common/util/bcrypt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { PostUsecase } from "@post/domain/usecase/post.usecase";
import { Reply } from "@reply/domain/entity/reply.entity";
import { ReplyUsecase } from "@reply/domain/usecase/reply.usecase";
import { Repository } from "typeorm";
import { FetchReplyListDto, RegistReplyDto } from "../http/dto/reply.dto";
import { FetchReplyListResponse } from "../http/response/fetch-reply-list.response";
import { FetchReplyResponse } from "../http/response/fetch-reply.response";
import { RegistReplyResponse } from "../http/response/regist-reply.response";
import { RegistReplyCommand } from "./command/regist-reply.command";
import { FetchReplyListQuery } from "./query/fetch-reply-list.query";

@Injectable()
export class ReplyService implements ReplyUsecase {
    constructor(
        private readonly registReplyCommand: RegistReplyCommand,
        private readonly fetchReplyListQuery: FetchReplyListQuery,
    ) {}

    async regist(registReplyDto: RegistReplyDto): Promise<RegistReplyResponse> {
        const registReply = {
            post_id: registReplyDto.postID,
            content: registReplyDto.content,
            writer: registReplyDto.writer,
            is_child: registReplyDto.isChild,
        }
        if (registReplyDto.isChild) {
            Object.assign(registReply, { parent_id : registReplyDto.parentID });
        }

        const reply = await this.registReplyCommand.regist(registReply);

        return {
            id: reply.id,
            post_id: reply.post_id,
            writer: reply.writer,
            is_child: reply.is_child,
            parent_id: reply.parent_id,
            created_at: reply.created_at,
        }
    }

    async getList(fetchReplyListDto: FetchReplyListDto): Promise<FetchReplyListResponse> {
        const page = fetchReplyListDto.page ? fetchReplyListDto.page : 1
        const limit = fetchReplyListDto.limit && fetchReplyListDto.limit <= 500 ? fetchReplyListDto.limit : 500;
        const [replyList, totalCount] = await this.fetchReplyListQuery.getList(
            fetchReplyListDto.postID, fetchReplyListDto.isChild, page, limit,
        );

        const responseReplyList = replyList.map(reply => ({
            id: reply.id,
            post_id: reply.post_id,
            content: reply.content,
            is_child: reply.is_child,
            created_at: reply.created_at,
            child_reply: {
                id: reply.child?.id,
                content: reply.child?.content,
                created_at: reply.child?.created_at,
            }
        }));
        return {
            replies: responseReplyList,
            pagination: {
                page,
                limit,
                total_count: totalCount,
            }
        }
    }
}