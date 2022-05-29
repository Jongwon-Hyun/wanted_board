import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@post/domain/entity/post.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config = configService.get('mysql');
                return {
                    ...config,
                    synchronize: false,
                    migrationsRun: false,
                    entities: [Post],
                    logging: true,
                    migrations: ["./dist/migrations/*"],
                }
            }
          }),
      ],
      controllers: [],
      providers: [],
})
export class MysqlModule {}
