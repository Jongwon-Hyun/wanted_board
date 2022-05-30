import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * 해시값 생성
 */
@Injectable()
export class Bcrypt {
    /**
     * 해시값 생성
     * @param value 해싱할 문자열
     * @returns 해싱값
     */
    async generate(value: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(value, saltOrRounds);    
    } 

    /**
     * 문자열이 해시값과 일치하는지 검증
     * @param value 해싱전 문자열
     * @param hash 해시값
     * @returns 
     */
    async isMatch(value: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(value, hash);
    }
}