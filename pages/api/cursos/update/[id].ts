// /api/cursos/update/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'PATCH') {
        const courseId = req.query.id as string; // Extract the course ID from the URL query parameter
        try {
            // Log the raw request body and headers
            console.log('Received PATCH request for course ID:', courseId);
            console.log('Request body:', req.body);
            console.log('Request headers:', req.headers);

            const data = req.body; // Request body is already a JSON object
            const updatedCourse = await prisma.curso.update({
                where: { id: parseInt(courseId, 10) },
                data,
            });
            res.status(200).json(updatedCourse);
        } catch (error) {
            console.error('Error while processing PATCH request:', error);
            res.status(500).json({ error: 'Course update failed' });
        }
    } else {
        res.status(405).end();
    }
}
