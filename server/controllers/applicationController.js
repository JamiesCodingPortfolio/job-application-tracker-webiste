export const addApplication = async (req, res) => {
    try {
        const { name, description } = req.body;
        const token = req.cookies['session-cookie'];

        if (!token) return res.status(401).send('Unauthorized');

    } catch (error) {
        
    }
}