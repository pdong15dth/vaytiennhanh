// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { title, id } = body;
    console.log("handle", title)
    const option = await prisma.option?.findUnique({
        where: {
            id: id
        }
    })
    
    console.log(option)
    const result = await prisma.option.upsert({
        where: {
            id: option?.id ?? 0
        },
        create: {
            title: title
        },
        update: {
            title: title
        }
    });
    res.json(result);
}
