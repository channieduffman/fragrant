import { prisma } from '../utils/prisma.js';

export const getFragrancesAnd = async (req, res) => {
    const notesString = req.query.notes;

    const requiredNotes = notesString.toLowerCase().split(',').map(note => note.trim()).filter(Boolean);

    try {
        const andConditions = requiredNotes.map(noteName => ({
            fragrance_notes: {
                some: {
                    scent_terms: {
                        term: {
                            equals: noteName,
                            mode: 'insensitive',
                        },
                    },
                },
            },
        }));

        const fragrances = await prisma.fragrances.findMany({
            where: {
                AND: andConditions,
            },
            include: {
                fragrance_notes: {
                    include: {
                        scent_terms: true,
                    },
                },
            },
        });

        res.json(fragrances);
    } catch (error) {
        console.error('Error during fragrance search:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
};