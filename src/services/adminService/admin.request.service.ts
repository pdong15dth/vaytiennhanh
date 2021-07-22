import {
  ILoginResponse,
  TReqLogin,
} from "../../interfaces/admin.interface/admin.http.interfaces";
import axiosService from "../httpService/axios.service";

class AdminRequestService {
  constructor() { }

  loginMethod(data: TReqLogin) {
    const uri = "admin/system/login";
    return axiosService.postMethod<TReqLogin, ILoginResponse>(uri, data);
  }

  logoutMethod() {
    const uri = "admin/logout";
    return axiosService.getMethod(uri);
  }

  //Get all user
  //{{url}}/api/admin/view/accounts
  getAllUser() {
    const uri = "admin/view/accounts";
    return axiosService.getMethod(uri);
  }

  //Get Info user
  //{{url}}/api/admin/phong/view/account
  getUserInfo(username: string) {
    const uri = `admin/${username}/view/account`;
    return axiosService.getMethod(uri);
  }

  //Create account
  //{{url}}/api/admin/signup
  createAccount(data) {
    const uri = "admin/signup";
    return axiosService.postMethod(uri, data);
  }

  //Update account
  //{{url}}/api/admin/account/update
  updateAccount(data) {
    const uri = "admin/account/update";
    return axiosService.putMethod(uri, data);
  }

  //{{url}}/api/admin/phong/disable/account
  disableAccount(username) {
    const uri = `admin/${username}/disable/account`;
    return axiosService.putMethod(uri, null);
  }

  //{{url}}/api/admin/dong/enable/account
  enableAccount(username) {
    const uri = `admin/${username}/enable/account`;
    return axiosService.putMethod(uri, null);
  }

  /**
   * API VEHICLE
   * 
   */
  //view all vehicle

  getAllVehicle() {
    const uri = "admin/vehicle/views";
    return axiosService.getMethod(uri);
  }
  
  getDetailVidecle(id) {
    const uri = `admin/vehicle/${id}/view-detail`;
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/admin/teacher/10/update
  updateVidecle(id, data) {
    const uri = `admin/vehicle/${id}/update`;
    return axiosService.putMethod(uri, data);
  }

  //{{url}}/api/admin/vehicle/create
  createVidecle(data) {
    const uri = `admin/vehicle/create`;
    return axiosService.postMethod(uri, data);
  }

  //View all teacher
  //{{url}}/api/admin/teacher/views
  getAllTeacher() {
    const uri = "admin/teacher/views";
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/admin/teacher/4/view-detail
  getDetailTeacher(id) {
    const uri = `admin/teacher/${id}/view-detail`;
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/admin/teacher/create
  createTeacher(data) {
    const uri = "admin/teacher/create";
    return axiosService.postMethod(uri, data);
  }

  //{{url}}/api/admin/teacher/10/update
  updateTeacher(id, data) {
    const uri = `admin/teacher/${id}/update`;
    return axiosService.putMethod(uri, data);
  }

  /*** Course API */

  //Get all course Active
  //{{url}}/api/admin/course/view/active
  getAllCourseActive(slug: string) {
    const uri = `admin/course/${slug}/views`;
    console.log(slug)
    return axiosService.getMethod(uri);
  }

  //Get All course in-active
  //{{url}}/api/admin/course/view/in-active
  getAllCourseInActive() {
    const uri = `admin/course/view/in-active`;
    return axiosService.getMethod(uri);
  }

  //Active course
  //{{url}}/api/admin/course/2/active
  updateActiveCourse(id, active) {
    const uri = `admin/course/${id}/${!active ? "active" : "in-active"}`;
    console.log(uri)
    return axiosService.putMethod(uri, null);
  }

  //Deactive course
  //{{url}}/api/admin/course/1/in-active
  updateDeactiveCourse(id) {
    const uri = `admin/course/${id}/in-active`;
    return axiosService.putMethod(uri, null);
  }

  //{{url}}/api/admin/course/2/view
  getListCourse(slug: string) {
    const uri = `admin/course/${slug}/views`;
    return axiosService.getMethod(uri);
  }

  //View detail course
  //{{url}}/api/admin/course/2/view
  getDetailCourse(id) {
    const uri = `admin/course/${id}/view`;
    return axiosService.getMethod(uri);
  }

  //Create course
  //{{url}}/api/admin/course/create
  createCourse(data) {
    const uri = "admin/course/create";
    return axiosService.postMethod(uri, data);
  }

  //Update course
  //{{url}}/api/admin/course/1/update
  updateCourse(id, data) {
    const uri = `admin/course/${id}/update`;
    return axiosService.putMethod(uri, data);
  }

  /*** API CLASS IN COURSE ***/

  //admin/class/create
  createClassInCourse(data) {
    const uri = "admin/class/create";
    return axiosService.postMethod(uri, data);
  }

  // {{url}}/api/admin/class/2/update
  updateClassInCourseById(id, data) {
    const uri = `admin/class/${id}/update`;
    return axiosService.postMethod(uri, data);
  }

  //{{url}}/api/admin/class/views
  getAllClassInCourse(id) {
    const uri = `admin/class/${id}/views`;
    return axiosService.getMethod(uri);
  }

  // {{url}}/api/admin/class/8/view-detail
  getDetailClassInCourse(id) {
    const uri = `admin/class/${id}/view-detail`;
    return axiosService.getMethod(uri);
  }

  /*** API STUDENT IN CLASS ***/
  //{{url}}/api/admin/student/views
  //GET ALL STUDENT
  getAllStudent() {
    const uri = `admin/student/views`;
    return axiosService.getMethod(uri);
  }
  
  //{{url}}/api/admin/student/20/view-detail
  //VIEW DETAIL STUDENT BY ID
  getDetailStudent(id) {
    const uri = `admin/student/${id}/view-detail`;
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/admin/student/create
  //CREATE STUDENT IN CLASS
  createStudentInClass(data) {
    const uri = "admin/student/create";
    return axiosService.postMethod(uri, data);
  }
  
  //{{url}}/api/admin/student/26/update
  //UPDATE STUDENT IN CLASS
  updateStudentInClass(id, data) {
    const uri = `admin/student/${id}/update`;
    return axiosService.putMethod(uri, data);
  }

  //{{url}}/api/admin/student/26/delete
  //DELETE STUDENT IN CLASS
  deleteStudentInClass(id, data) {
    const uri = `admin/student/${id}/delete`;
    return axiosService.deleteMothod(uri);
  }

  /*** API TEACHER IN COURSE AVAILABLE ***/
  // {{url}}/api/admin/teacher/views-available
  getAvailableTeacherInCourse() {
    const uri = `admin/teacher/views-available`;
    return axiosService.getMethod(uri);
  }

  /*** API VEHICLE IN COURSE AVAILABLE ***/
  // {{url}}/api/admin/vehicle/views-available
  getAvailableVehicleInCourse() {
    const uri = `admin/vehicle/views-available`;
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/admin/vehicle/3/in-active
  activeOrDeActiveVehicle(isActive, id) {
    const uri = `admin/vehicle/${id}/${isActive ? "active" : "in-active"}`;
    return axiosService.putMethod(uri, null);
  }
}

const adminReqService = new AdminRequestService();
export default adminReqService;
