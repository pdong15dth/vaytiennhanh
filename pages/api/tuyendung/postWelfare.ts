// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const result = await prisma.welfare.create({
        data: {
            title: body?.title
        }
    })
    res.json(result);
}
