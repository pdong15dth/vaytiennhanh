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

export default async (req, res) => {
    // parse form with a Promise wrapper
    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
        })
    })

    console.log("request data: ", data)
    const result = await prisma.banner.upsert({
        update: {
            image: data.fields.image
        },
        create: {
            image: data.fields.image
        },
        where: {
            id: 1
        },

    }).catch(error => {
    });
    res.json(result);
}
