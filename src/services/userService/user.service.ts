import axios, { AxiosResponse } from "axios";
import axiosService from "../httpService/axios.service";
import { TLicenseType } from "../../interfaces/question";

type dataCheckQuestions = {
  id_suite: number;
  answers: { id_question: number; answer: string }[];
};
class UserRequestService {
  constructor() {}
  //API News Page
  postContact(data) {
    const uri = "post";
    return axiosService.postMethod(uri, data);
  }

  postContactInfo(data) {
    const uri = "post/postContactInfo";
    return axiosService.postMethod(uri, data);
  }
  
  getContact() {
    const uri = "post/listUser";
    return axiosService.getMethod(uri);
  }
  getCareer() {
    const uri = "tuyendung/getCareer";
    return axiosService.getMethod(uri);
  }
  getContactInfo() {
    const uri = "post/getContactInfo";
    return axiosService.getMethod(uri);
  }

  getRequire() {
    const uri = "post/getRequire";
    return axiosService.getMethod(uri);
  }

  getBenefit() {
    const uri = "post/getBenefit";
    return axiosService.getMethod(uri);
  }
  getFaq() {
    const uri = "post/getFaq";
    return axiosService.getMethod(uri);
  }
  getQues() {
    const uri = "post/getQues";
    return axiosService.getMethod(uri);
  }
  
  createRequire(data) {
    console.log(data)
    const uri = "post/createRequire";
    return axiosService.postMethod(uri, data);
  }

  updateKeywordSEO(data) {
    const uri = "post/updateKeywordSEO";
    return axiosService.postMethod(uri, data);
  }

  getKeywordSEO() {
    const uri = "post/getKeywordSEO";
    return axiosService.getMethod(uri);
  }
}

const userRequestService = new UserRequestService();
export default userRequestService;

//upload file gi
//image để mình demo
//di từ ckeditor/index.js -> api/upload -
