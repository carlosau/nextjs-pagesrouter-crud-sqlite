// // /api/cursos/update.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'PATCH') {
//         try {
//             const { id, ...updateData } = req.body;

//             if (!id || Object.keys(updateData).length === 0) {
//                 res.status(400).json({ error: 'Invalid request data' });
//                 return;
//             }

//             await prisma.curso.update({
//                 where: { id: parseInt(id, 10) },
//                 data: updateData,
//             });

//             res.status(200).json({ message: 'Course updated successfully' });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Update course failed' });
//         }
//     } else {
//         res.status(405).end();
//     }
// }
