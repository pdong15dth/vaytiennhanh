// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { title, description, voucher, subTitleVoucher } = body;
    console.log("handle", title, description, voucher, subTitleVoucher)
    const result = await prisma.titleHeader.upsert({
        where: {
            id: 1
        },
        create: {
            title: title,
            description: description,
            voucher: voucher,
            subTitleVoucher: subTitleVoucher
        },
        update: {
            title: title,
            description: description,
            voucher: voucher,
            subTitleVoucher: subTitleVoucher
        }
    });
    res.json(result);
}
