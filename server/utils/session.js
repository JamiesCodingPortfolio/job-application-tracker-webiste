import { z } from 'zod';
import crypto from 'crypto';

const sessionSchema = z.object({
    id: z.string()
})

export function createUserSession(){
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();
    return sessionId;
}