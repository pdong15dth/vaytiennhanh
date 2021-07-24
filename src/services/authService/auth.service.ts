import localStorageService from "../localStorage.service/localStorage.service";

class AuthService {
  private localStorageServ = localStorageService;
  private token: string = "";
  constructor() {}
  checkAuthAdmin(): boolean {
    console.log("checking")
    const token = this.localStorageServ.userInfor.get();
    return !!token ? true : false;
  }

  getToken(): string {
    if (!this.token && typeof window !== "undefined") {
      this.token = this.localStorageServ.accessToken.get();
    }
    return this.token;
  }

  getUserInfor = () => {
    const result = this.localStorageServ.userInfor.get()
    return result;
  }

  removeToken(): void {
    this.localStorageServ.accessToken.remove();
    this.token = null;
  }

  removeUserInfor = (): void => {
    this.localStorageServ.userInfor.remove();
  };

  handleAdminLogout = (): void => {
    this.removeToken();
    this.removeUserInfor();
  };
}

const authService = new AuthService();
export default authService;
