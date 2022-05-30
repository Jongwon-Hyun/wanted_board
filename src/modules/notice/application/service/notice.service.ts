import { Injectable, Logger } from "@nestjs/common";

/**
 * 알림 발송 서비스
 */
@Injectable()
export class NoticeService {
    /**
     * 알림을 발송
     * @param writer 작성자
     * @param keword 키워드
     */
    notice(writer: string, keword: string) {
        Logger.log(`notice to ${writer} [keword] ${keword}`);
    }
}