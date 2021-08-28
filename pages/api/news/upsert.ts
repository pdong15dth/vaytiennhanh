// pages/api/post/index.ts

import prisma from '../../../lib/prisma';
import utils from '../../../src/utils/constant';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    var b = utils.ChangeToSlug(body.title)
    var slug = b
    var slugNoConvert = b
    const result = await prisma.news.upsert({
        where: {
            id: parseInt(body?.id) ?? 0
        },
        create: {
            title: body.title,
            slug: slug,
            slugNoConvert: slugNoConvert,
            avatar: body.avatar,
            description: body.description,
            detail: body.detail,
            tag: body.tag,
            createdBy: body.createdBy
        },
        update: {
            title: body.title,
            slug: slug,
            slugNoConvert: slugNoConvert,
            avatar: body.avatar,
            description: body.description,
            detail: body.detail,
            tag: body.tag,
            createdBy: body.createdBy
        }
    });
    res.json(result);
}
