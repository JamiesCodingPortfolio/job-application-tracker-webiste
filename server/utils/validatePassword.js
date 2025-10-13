import crypto from 'crypto';

export const validatePassword = (generatedPass, storedPass) => {
    return crypto.timingSafeEqual(
        Buffer.from(generatedPass, 'hex'),
        Buffer.from(storedPass, 'hex')
    );
}