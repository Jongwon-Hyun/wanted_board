import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                // nest js config 에서 설정값 획득
                const config = configService.get('mysql');
                console.log(config);
                return {
                    ...config,
                    synchronize: false,
                    migrationsRun: false,
                    entities: ["./dist/**/*.entity.js"],
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
