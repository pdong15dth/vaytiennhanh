// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const countResult = await prisma.countRequest.findFirst({
        where: {
            id: 1
        }
    })
    const count = countResult?.count
    const result = await prisma.countRequest.upsert({
        where: {
            id: 1
        },
        create: {
            count: 1
        },
        update: {
            count: count + 1
        }
    });
    res.json(result);
}
