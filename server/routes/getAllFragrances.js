import { prisma } from "../utils/prisma.js";

export const getAllFragrances = async (req, res) => {

    try {
        const fragrances = await prisma.fragrances.findMany({
            include: {
                fragrance_notes: {
                    include: {
                        scent_terms: true,
                    }
                }
            }
        });

        res.json(fragrances);
    } catch (error) {
        console.error(error);
    }
}