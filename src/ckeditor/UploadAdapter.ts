import axios from "axios";

export default class UploadAdapter {
  url: any;
  loader: any;
  file: any;
  constructor(loader, url) {
    this.url = url;
    this.loader = loader;
    this.loader.file.then((pic) => (this.file = pic));

    // this.upload();
  }

  // Starts the upload process.
  upload() {
    const fd = new FormData();
    fd.append("upload", this.file);

    return new Promise((resolve, reject) => {
      axios.post(this.url, fd, {
          onUploadProgress: (e) => {
            console.log(
              "onUploadProgress",
              // show upload process
              Math.round((e.loaded / e.total) * 100) + " %"
            );
          },
        })
        .then((response) => {
          let json = {
            default: response.data.url
          }
          resolve(json);
        })
        .catch((error) => {
          reject("Server Error");
          console.log("Server Error : ", error);
        });
    });
  }
}
