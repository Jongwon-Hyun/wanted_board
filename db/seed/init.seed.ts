import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Post } from '../../src/modules/post/domain/entity/post.entity';
import { Reply } from '../../src/modules/reply/domain/entity/reply.entity';
import { Notice } from '../../src/modules/notice/domain/entity/notice.entity';
import { NoticeQueue } from '../../src/modules/notice/domain/entity/notice-queue.entity';

export default class InitSeeding implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder()
      .insert()
      .into(Post)
      .values([
        { title: 'title1', content: 'content1', writer: 'writer1', password: 'password1'},
        { title: 'title2', content: 'content2', writer: 'writer2', password: 'password2'},
        { title: 'title3', content: 'content3', writer: 'writer3', password: 'password3'},
        { title: 'search', content: 'find rabbit', writer: 'writer4', password: 'password4'},
        { title: 'find', content: 'search bear', writer: 'writer5', password: 'password5'},
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Reply)
      .values([
        { content: 'title1 reply1', writer: 'writer1-1', is_child: false, post_id: 1 },
        { content: 'title1 reply1 child', writer: 'writer1-1 child', is_child: true, post_id: 1, parent_id: 1 },
        { content: 'title1 reply2', writer: 'writer1-2', is_child: false, post_id: 1 },
        { content: 'title1 reply2 child', writer: 'writer1-2 child', is_child: true, post_id: 1, parent_id: 3 },
        { content: 'title2 reply1', writer: 'writer2-1', is_child: false, post_id: 1 },
      ])
      .execute();

      await connection
      .createQueryBuilder()
      .insert()
      .into(Notice)
      .values([
        { writer: 'writer1', keword: 'rabbit' },
        { writer: 'writer2', keword: 'bear' },
      ])
      .execute();

      await connection
      .createQueryBuilder()
      .insert()
      .into(NoticeQueue)
      .values([
        { job_id: 1, job_type: 'post' },
        { job_id: 2, job_type: 'post' },
        { job_id: 3, job_type: 'post' },
        { job_id: 4, job_type: 'post' },
        { job_id: 5, job_type: 'post' },
        { job_id: 1, job_type: 'reply' },
        { job_id: 2, job_type: 'reply' },
        { job_id: 3, job_type: 'reply' },
        { job_id: 4, job_type: 'reply' },
        { job_id: 5, job_type: 'reply' },
      ])
      .execute();
  }
}