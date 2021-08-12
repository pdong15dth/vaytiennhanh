// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const result = await prisma.social.upsert({
        where: {
            id: 1
        },
        create: {
            name: "Zalo",
            value: body.value
        },
        update: {
            name: "Zalo",
            value: body.value
        }
    })
    res.json(result);
}
