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
    fd.append("image", this.file);

    console.log(this.url)
    return new Promise((resolve, reject) => {
      axios.post(this.url, fd, {
        headers: {
          'Authorization': 'Client-ID cb0adfde641e643',
          'Cookie': 'IMGURSESSION=ed4b73de860cc849180f169c4694e883; _nc=1',
        },
        onUploadProgress: (e) => {
          console.log(
            "onUploadProgress",
            // show upload process
            Math.round((e.loaded / e.total) * 100) + " %"
          );
        },
      })
        .then((response) => {
          var data = JSON.stringify(response.data)
          var jsonurl = JSON.parse(data)
          console.log("dong ne", jsonurl.data.link)
          let json = {
            default: jsonurl.data.link
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
