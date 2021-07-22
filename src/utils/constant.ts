class Utils {
  constructor() { }
  baseURL: string = "https://api.hellobugs.dev";
  ChangeToSlug(slug) {
    //Đổi chữ hoa thành chữ thường
    slug = slug.toLowerCase(); //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d"); //Xóa các ký tự đặt biệt
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    ); //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-"); //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-"); //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, ""); //In slug ra textbox có id “slug”
    return slug;
  }

  formatDate(input) {
    var datePart = input.match(/\d+/g),
      day = datePart[0], // get only two digits
      month = datePart[1],
      year = datePart[2];
    return day + "/" + month + "/" + year;
  }

  checkEmailValid(email) {
    var vnf_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "") {
      if (vnf_regex.test(email) == false) {
        return "Email của bạn không đúng định dạng!";
      } else {
        return "";
      }
    } else {
      return "Bạn chưa điền Email!";
    }
  }

  checkStringIsNumber(value) {
    const result = /^-?\d+$/.test(value)
    return result ? "" : "Vui lòng nhập tiền với định dạng là số";
  }

  checkPhoneNumber(phone) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phone !== "") {
      if (vnf_regex.test(phone) == false) {
        return "Số điện thoại của bạn không đúng định dạng!";
      } else {
        return "";
      }
    } else {
      return "Bạn chưa điền số điện thoại!";
    }
  }

  checkCMNDNumber(cmnd) {
    var ar = cmnd.split("");
    console.log(ar)
    if (ar.length != 9 && ar.length != 12) {
      return "CMMD / CCCD của bạn không đúng định dạng!"
    }
    var vnf_regex = /(([0-9]{9})\b)/g;
    if (cmnd !== "") {
      if (vnf_regex.test(cmnd) == false) {
        return "CMMD / CCCD của bạn không đúng định dạng!";
      } else {
        return "";
      }
    } else {
      return "Bạn chưa điền CMMD / CCCD!";
    }
  }
  checkEmptyString(string) {
    if (string == "") {
      return "Vui lòng không bỏ trống trường này!"
    }
    return ""
  }
  checkIsValidCourse(name) {
    return utils.listCourse.indexOf(name)
  }
  listCourse = ["B2", "C", "D", "E", "F"]
};


const utils = new Utils();
export default utils;
