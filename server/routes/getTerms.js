import { prisma } from '../utils/prisma.js';

export const getTerms = async (req, res) => {
    try {
        const { level } = req.params;
        const families = await prisma.scent_terms.findMany({
            where: {
                level: level,
            },
            select: {
                term: true,
            },
        });
        const flat = families.map(f => f.term);
        res.json(flat);
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
};