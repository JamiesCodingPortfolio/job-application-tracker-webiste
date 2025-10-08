export const emailExists = async (email) => {
    console.log (`Running email check for email ${email}`);
    try {
        if (typeof email !== 'string' || email.trim() === ''){
            throw new Error('Invalid email input');
        }

        const lowercaseEmail = email.toLowerCase().trim();

        
    } catch (error) {
        
    }
}