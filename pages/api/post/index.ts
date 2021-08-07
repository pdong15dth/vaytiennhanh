// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { name, phone, address, amount, type_amount } = body;
    console.log("data:", name, phone, address, amount, type_amount)
    const result = await prisma.user.create({
        data: {
            name: name,
            phone: phone,
            address: address,
            amount: amount,
            type_amount: type_amount
        },
    });
    res.json(result);
}
