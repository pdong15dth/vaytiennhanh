// pages/api/post/index.ts

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const result = await prisma.recruitment.upsert({
        where: {
            id: 1
        },
        create: {
            //tiêu đề tuyển dụng
            titleJob: body.titleJob,
            //Liên hệ với chúng tôi
            titleForm: body.titleForm,
            //Nơi làm việc
            address: body.address,
            //Cấp Bâtj
            rank: body.rank,
            //Hình thức
            form: body.form,
            //Bằng Cấp
            certificate: body.certificate,
            //Kinh nghiệm
            experience: body.experience,
            //Mức lương Int?
            rangeSalary: body.rangeSalary,
            // Ngành nghề
            career: body.career,
            //Hạn chót
            deadline: body.deadline,
            //Phúc lợi
            welfare: body.welfare,
            //Mô tả job
            descriptionJob: body.descriptionJob,
            requirementJob: body.requirementJob,
            titleTieudeForm: body.titleTieudeForm,
            titleTieuDeTD: body.titleTieuDeTD,
            titleNoiLamViec: body.titleNoiLamViec,
            titleCapBac: body.titleCapBac,
            titleBangCap: body.titleBangCap,
            titleKinhNghiem: body.titleKinhNghiem,
            titleHinhThuc: body.titleHinhThuc,
            titleMucLuong: body.titleMucLuong,
            titleNgayHetHan: body.titleNgayHetHan,
            titleNganhNghe: body.titleNganhNghe,
            titlePhucLoi: body.titlePhucLoi,
            titleMotaCV: body.titleMotaCV,
            titleYeucauCV: body.titleYeucauCV,
        },
        update: {
            //tiêu đề tuyển dụng
            titleJob: body.titleJob,
            //Liên hệ với chúng tôi
            titleForm: body.titleForm,
            //Nơi làm việc
            address: body.address,
            //Cấp Bâtj
            rank: body.rank,
            //Hình thức
            form: body.form,
            //Bằng Cấp
            certificate: body.certificate,
            //Kinh nghiệm
            experience: body.experience,
            //Mức lương Int?
            rangeSalary: body.rangeSalary,
            // Ngành nghề
            career: body.career,
            //Hạn chót
            deadline: body.deadline,
            //Phúc lợi
            welfare: body.welfare,
            //Mô tả job
            descriptionJob: body.descriptionJob,
            //Yêu cầu job
            requirementJob: body.requirementJob,
            titleTieudeForm: body.titleTieudeForm,
            titleTieuDeTD: body.titleTieuDeTD,
            titleNoiLamViec: body.titleNoiLamViec,
            titleCapBac: body.titleCapBac,
            titleBangCap: body.titleBangCap,
            titleKinhNghiem: body.titleKinhNghiem,
            titleHinhThuc: body.titleHinhThuc,
            titleMucLuong: body.titleMucLuong,
            titleNgayHetHan: body.titleNgayHetHan,
            titleNganhNghe: body.titleNganhNghe,
            titlePhucLoi: body.titlePhucLoi,
            titleMotaCV: body.titleMotaCV,
            titleYeucauCV: body.titleYeucauCV,
        }
    })
    res.json(result);
}
