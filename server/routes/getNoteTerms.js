import { prisma } from '../utils/prisma.js';

export const getNoteTerms = async (req, res) => {
    try {
        const families = await prisma.scent_terms.findMany({
            where: {
                level: 'Note',
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