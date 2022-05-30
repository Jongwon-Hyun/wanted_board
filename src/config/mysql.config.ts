import { registerAs } from '@nestjs/config';

/**
 * MySQL 설정값을 nest config 세팅
 */
export default registerAs('mysql', () => {
  return {
    type: 'mysql',
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT as string, 10),
    username: process.env.MYSQL_DB_USER_NAME,
    password: process.env.MYSQL_DB_PASSWORD,
  };
});