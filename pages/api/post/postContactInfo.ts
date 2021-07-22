// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { phone, address, email } = req.body;
    console.log("handle", phone, address, email)
    const result = await prisma.contact.upsert({
        where: {
            id: 1
        },
        create: {
            phone: phone,
            address: address,
            email: email
        },
        update: {
            phone: phone,
            address: address,
            email: email
        }
    });
    res.json(result);
}
