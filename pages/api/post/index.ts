// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { name, phone, address, amount, type_amount } = req.body;
    const result = await prisma.user.create({
        data: {
            name: name,
            phone: phone,
            address: address,
            amount: parseInt(amount),
            type_amount: type_amount
        },
    });
    res.json(result);
}
