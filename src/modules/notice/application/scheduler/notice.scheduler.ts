import { Injectable, Logger } from "@nestjs/common";
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from "@nestjs/typeorm";
import { NoticeQueue } from "@notice/domain/entity/notice-queue.entity";
import { Notice } from "@notice/domain/entity/notice.entity";
import { Post } from "@post/domain/entity/post.entity";
import { Reply } from "@reply/domain/entity/reply.entity";
import { Repository } from "typeorm";
import { NoticeService } from "../application/notice.service";

@Injectable()
export class NoticeScheduler {
    
    constructor(
        private readonly noticeService: NoticeService,
        @InjectRepository(Notice)
        private readonly noticeRepository: Repository<Notice>,
        @InjectRepository(NoticeQueue)
        private readonly noticeQueueRepositoy: Repository<NoticeQueue>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(Reply)
        private readonly replyRepository: Repository<Reply>, 
    ) {}

    // 5분 마다 실행, 리얼타임을 위해서는 상당한 서버 리소스가 필요
    // 서비스 규모가 커지고 서버 리소스를 더 이상 감당하기 힘들 때는 카프카 등을 이용한 비동기 메시지 큐 서버를 구축해야 함 
    @Cron('* */5 * * * *')
    async notice() {
        const noticeList = await this.noticeRepository.find();
        const jobList = await this.noticeQueueRepositoy.find();
        
        let contentList = await Promise.all(jobList.map(async job => {
            switch (job.job_type) {
                case 'post':
                    const post = await this.postRepository.findOne(job.job_id);
                    return post.content;
                case 'reply':
                    const reply = await this.replyRepository.findOne(job.job_id);
                    return reply.content;
            }  
        }).filter(v => !!v));

        const distinctContentList = [...new Set(contentList)];
        let count = 0;

        // like %keyword% 풀스캔 보다는 반복문이 낫다고 판단
        for (const notice of noticeList) {
            for (const word of distinctContentList) {
                if (word.includes(notice.keword)) {
                    this.noticeService.notice(notice.writer, notice.keword);
                    count += 1;
                }
            }
        }

        // 로그를 파일로 저장할 경우, 쌓이는 로그 파일을 정리할 방법이 필요
        Logger.log(`${count} 개의 알림을 발송했습니다.`);
    }

    async registJob(jobId: number, jobType: 'post' | 'reply') {
        await this.noticeQueueRepositoy.save({
            job_id: jobId,
            job_type: jobType,
        });
    }
}