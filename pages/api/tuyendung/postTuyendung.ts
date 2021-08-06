// pages/api/post/index.ts

import prisma from '../../../lib/prisma';
import { IncomingForm } from 'formidable'
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from 'fs'
var os = require("os");

// first we need to disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    }
};

export default async(req, res) => {
    // parse form with a Promise wrapper
    const body = JSON.parse(req.body)
    const result = await prisma.tuyenDung.upsert({
        update: {
            content: body.content,
        },
        create: {
            content: body.content,
        },
        where: {
            id: 1
        },

    }).catch(error => {
        console.log("loi roi ne", error)
    });
    console.log("loi roi ne 2", result)
    res.json(result);
}