// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = req.body
    const result = await prisma.news.delete({
        where: {
            id: body?.id
        }
    }).catch (error => {
        return res.json({
            message: "Bài viết không tồn tại. Vui lòng làm mới lại trang"
        });
    });

    res.json(result);
}
