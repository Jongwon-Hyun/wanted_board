import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
