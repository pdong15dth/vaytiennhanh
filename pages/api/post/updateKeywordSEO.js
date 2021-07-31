// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {

    const body = JSON.parse(req.body)
    console.log("body", body)
    const {
        description,
        keywords,
        fb_app_id,
        og_title,
        og_url,
        og_image,
        icon_website,
        og_description,
        og_site_name,
        og_see_also,
        og_locale,
        article_author,
        twitter_card,
        twitter_url,
        twitter_title,
        twitter_description,
        twitter_image,
        author,
        generator,
        copyright
    } = body;
    const result = await prisma.seoWeb.upsert({
        where: {
            id: 1
        },
        create: {
            description: description,
            keywords: keywords,
            fb_app_id: fb_app_id,
            og_title: og_title,
            og_url: og_url,
            og_image: og_image,
            icon_website: icon_website,
            og_description: og_description,
            og_site_name: og_site_name,
            og_see_also: og_see_also,
            og_locale: og_locale,
            article_author: article_author,
            twitter_card: twitter_card,
            twitter_url: twitter_url,
            twitter_title: twitter_title,
            twitter_description: twitter_description,
            twitter_image: twitter_image,
            author: author,
            generator: generator,
            copyright: copyright
        },
        update: {
            description: description,
            keywords: keywords,
            fb_app_id: fb_app_id,
            og_title: og_title,
            og_url: og_url,
            og_image: og_image,
            icon_website: icon_website,
            og_description: og_description,
            og_site_name: og_site_name,
            og_see_also: og_see_also,
            og_locale: og_locale,
            article_author: article_author,
            twitter_card: twitter_card,
            twitter_url: twitter_url,
            twitter_title: twitter_title,
            twitter_description: twitter_description,
            twitter_image: twitter_image,
            author: author,
            generator: generator,
            copyright: copyright
        }
    });
    res.json(result);
}