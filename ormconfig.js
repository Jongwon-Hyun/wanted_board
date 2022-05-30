// TypeORM cli 를 위한 설정
module.exports = {
  type: 'mysql',
  database: 'wanted-board',
  host: 'localhost',
  port: 3310,
  username: 'root',
  password: 'password',
  synchronize: false,
  migrationsRun: false,
  entities: ["./dist/**/*.entity.js"],
  autoLoadEntities: true,
  migrations: ["./dist/migrations/*"],
  seeds: ['./dist/db/seed/*'],
  cli: {
      migrationsDir: "./migrations",
  }
};