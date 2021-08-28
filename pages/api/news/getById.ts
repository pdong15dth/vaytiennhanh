// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {

    console.log(req.query.id)
    const result = await prisma.news.findUnique({
        where: {
            id: parseInt(req.query.id)
        }
    }).catch(error => {
        res.json({
            code: 404,
            message: "Không tìm thấy bài viết"
        });
    });
    console.log(result)
    res.json(result ?? {
        code: 404,
        message: "Không tìm thấy bài viết"
    });
}
