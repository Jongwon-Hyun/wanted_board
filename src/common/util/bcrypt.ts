import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
    async generate(value: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(value, saltOrRounds);    
    } 

    async isMatch(value: string, hash: string) {
        return await bcrypt.compare(value, hash);
    }
}