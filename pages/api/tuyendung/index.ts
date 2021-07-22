// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { fullname, phone, cmnd, address } = req.body;
    console.log("handle", fullname, phone, cmnd, address)
    const result = await prisma.career.create({
        data: {
            fullname: fullname,
            phone: phone,
            address: address,
            cmnd: cmnd
        }
    });
    res.json(result);
}
