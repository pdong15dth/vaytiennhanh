import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-custom-build";
import UploadAdapter from "./UploadAdapter";

// Server URL
const URL = "https://api.imgur.com/3/image";

function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Create new object and pass server url
    let data = new UploadAdapter(loader, URL);
    return data
  };
}

// https://ck
class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "",
    };
  }

  render() {
    // CKEditor Config
    var data2 = ""
    var json: any = JSON.stringify(this.props)
    var parse = JSON.parse(json)
    data2 = parse.data
    const config = {
      language: "en", // fa - for persian language ( rtl )
      extraPlugins: [CustomUploadAdapterPlugin],
    };
    console.log("ClassicEditor")
    console.log(ClassicEditor.defaultConfig)
    return (
      <>
        <CKEditor
          editor={ClassicEditor}
          // https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html#component-properties
          // https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html
          config={config}
          data={data2}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use! ", editor);

            editor.plugins.get("TextTransformation").isEnabled = true;
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props["onchangeData"](data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </>
    );
  }
}

export default App;
