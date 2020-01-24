import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./StyleComponents/RichTextStyle.css";
import { Row } from 'antd'

export default class RichText extends Component {
  state = {
    editorData: []
  };
  handleGetRichText = e => {
    console.log("Content was updated:", e.target.getContent());
    this.props.handleGetRichText(e.target.getContent())
  };

  render() {
    return (
      <div className="richTextBox">
        <h3 style={{textAlign: "center"}}>Event Description</h3>
        <Row type="flex" justify="center">
          <Editor
            apiKey="7g24t1aop3vqrvu8euvt9sba0lt1u87ns1rr50urwq231dae"
            init={{
              height: 400,
              width: "90%",
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount"
              ],
              toolbar:
                // eslint-disable-next-line no-multi-str
                "undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | image",
              images_upload_url: "",
              images_upload_handler: function(blobInfo, success, failure) {
                Axios.post()
              }
            }}
            onChange={this.handleGetRichText}
          />
        </Row>
      </div>
    );
  }
}
