import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   if (req.method === 'GET') {
    try {
        const cursos = await prisma.curso.findMany();
        res.status(200).json(cursos)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Get Courses list failed"})
    }
   } else {
    res.status(405).end()
   }
}

