import { UserRole } from "../constants/constaints";

export class LoginDataModel {
  address: string;
  available: boolean;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  fullname: string;
  phone: string;
  role: string;
  sex: string;
  username: string;
  isValidAdmin: boolean = false;

  constructor(data: any) {
    if (data) {
      this.address = data?.address;
      this.available = data?.available;
      this.createdAt = data?.created_at;
      this.dateOfBirth = data?.date_of_birth;
      this.email = data?.email;
      this.fullname = data?.fullname;
      this.phone = data?.phone;
      this.role = data?.role;
      this.sex = data?.sex;
      this.username = data?.username;
      this.isValidAdmin = this.role === UserRole.admin
    }
  }
}
