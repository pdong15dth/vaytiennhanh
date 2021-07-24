// pages/api/post/index.ts

import prisma from '../../../lib/prisma';
import CryptoJS from 'crypto-js'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { username, password } = req.body;
    console.log("handle", username, password)
    var sha256Hash = CryptoJS.SHA256(password);
    console.log(sha256Hash.toString());
    const result = await prisma.userAdmin.create({
        data: {
            username: username,
            password: sha256Hash.toString()
        }
    })
    res.json(result);
}
