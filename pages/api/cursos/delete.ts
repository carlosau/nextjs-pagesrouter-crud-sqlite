import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const courseId = req.query.id as string; // Extract the course ID from the query parameter

            if (!courseId) {
                res.status(400).json({ error: 'Invalid course ID' });
                return;
            }

            // Convert courseId to a number
            const id = parseInt(courseId, 10);

            // Delete the course with the specified ID
            await prisma.curso.delete({
                where: { id },
            });

            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Delete course failed' });
        }
    } else {
        res.status(405).end();
    }
}
