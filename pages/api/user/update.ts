// pages/api/post/index.ts

import prisma from '../../../lib/prisma';
import CryptoJS from 'crypto-js'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { username, odl_password, new_password } = req.body;
    console.log("handle", username, odl_password)
    var sha256Hash = CryptoJS.SHA256(odl_password);
    console.log(sha256Hash.toString());

    const user = await prisma.userAdmin?.findFirst({
        where: {
            username: username,
            password: sha256Hash.toString()
        }
    })
    const result = await prisma.userAdmin.update({
        where: {
            id: user.id,
        },
        data: {
            username: username,
            password: CryptoJS.SHA256(new_password).toString()
        }
    })
    res.json(result);
}
