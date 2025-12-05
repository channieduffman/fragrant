import { prisma } from '../utils/prisma.js';

export const getFragrancesAnd = async (req, res) => {
    const notesString = req.query.notes;

    const requiredNotes = notesString.toLowerCase().split(',').map(note => note.trim()).filter(Boolean);
    if (!requiredNotes) {
        return res.status(400).send("Missing params");
    }
    console.log(requiredNotes);

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
        const flat = fragrances.map(f => f.name);
        console.log(flat);
        res.json(flat);
    } catch (error) {
        console.error('Error during fragrance search:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
};