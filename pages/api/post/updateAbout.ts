// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { content } = body;
    console.log("handle", content)
    const result = await prisma.about.upsert({
        where: {
            id: 1
        },
        create: {
            content: content
        },
        update: {
            content: content
        }
    });
    res.json(result);
}
