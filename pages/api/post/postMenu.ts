// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { menu1, menu2, menu3 } = body;
    console.log("handle", menu1, menu2, menu3)
    const result = await prisma.menuHeader.upsert({
        where: {
            id: 1
        },
        create: {
            menu1: menu1,
            menu2: menu2,
            menu3: menu3
        },
        update: {
            menu1: menu1,
            menu2: menu2,
            menu3: menu3
        }
    });
    res.json(result);
}
