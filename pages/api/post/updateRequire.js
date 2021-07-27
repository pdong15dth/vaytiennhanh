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
    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
        })
    })

    // read file from the temporary path
    // const contents = await fs.readFile(data?.files?.img.path)
    // var name = `${Date.now()}.png`
    // var filename = `./public/${name}`
    // fs.writeFile(`${filename}`, contents, function (err) {
    //     console.log("loi", err)
    //     if (err) throw err;
    // });

    const item = await prisma.require.findFirst({
        where: {
            id: data.fields.id ? parseInt(data.fields.id) : 0
        }
    })

    console.log("item", item)

    const result = await prisma.require.upsert({
        where: {
            id: item ? item.id : 0
        },
        update: {
            name: data.fields.name,
            image: data.fields.image,
            content: data.fields.content
        },
        create: {
            name: data.fields.name,
            image: data.fields.image,
            content: data.fields.content
        },
    }).catch(error => {});
    res.json(result);
}