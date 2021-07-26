
// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { title, id } = body;
    const result = await prisma.option.delete({
        where: {
            id: id
        }
    })
    res.json(result);
}
