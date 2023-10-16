import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   if (req.method === 'POST') {
    try {
        const data = req.body
        console.log(data)
        await prisma.curso.create({ data })
        res.status(201).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Course creation failed"})
    }
   } else {
    res.status(405).end()
   }
}

