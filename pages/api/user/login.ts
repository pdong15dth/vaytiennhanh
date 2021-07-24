// pages/api/post/index.ts

import prisma from '../../../lib/prisma';
import CryptoJS from 'crypto-js'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { username, password } = body;
    var sha256Hash = CryptoJS.SHA256(password);
    console.log(username, password, sha256Hash.toString())
    const result = await prisma.userAdmin?.findFirst({
        where: {
            username: username,
            password: sha256Hash.toString()
        }
    })
    console.log("handle res", result)
    res.json(result);
}
