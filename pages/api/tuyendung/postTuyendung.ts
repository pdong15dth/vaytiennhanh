// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const result = await prisma.tuyenDung.upsert({
        where: {
            id: 1
        },
        create: {
            content: body.content
        },
        update: {
            //tiêu đề tuyển dụng
            content: body.content
        }
    })
    res.json(result);
}
