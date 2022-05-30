import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class NoticeService {
    notice(writer: string, keword: string) {
        Logger.log(`notice to ${writer} [keword] ${keword}`);
    }
}