// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const result = await prisma.career.findMany({
        orderBy: {createdAt : 'desc'}
    })
    res.json(result);
}
