import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { serviceEvent } from "../../../../_service/eventServices";
import "./StyleComponents/RichTextStyle.css";
import { Row } from 'antd'

export default class RichText extends Component {
  state = {
    editorData: [],
    eventList: [],
    content: ""
  };
  handleGetRichText = e => {
    console.log("Content was updated:", e.target.getContent());
    this.props.handleGetRichText(e.target.getContent())
  };

  componentDidMount() {
    this.getEventDetail();
  }

  async getEventDetail() {
    try {
      let eventList = await serviceEvent.getEventDetail();
      eventList = eventList.result;
      this.setState({ eventList });
      this.setState({ content: eventList.event_content });
      // console.log("content", eventList.event_content);
      
    } catch (error) {
      console.log("error", error);
    }
  }

  render() {
    return (
      <div className="richTextBox">
        <h3 style={{ textAlign: "center" }}>Event Description</h3>
        <Row type="flex" justify="center">
          <Editor
            apiKey="7g24t1aop3vqrvu8euvt9sba0lt1u87ns1rr50urwq231dae"
            initialValue= {this.state.content}
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
                // var xhr, formData;
                // xhr = new XMLHttpRequest();
                // xhr.withCredentials = false;
                // xhr.open('POST', 'postAcceptor.php');
                // xhr.onload = function() {
                //   var json;
                //   if (xhr.status != 200) {
                //     failure('HTTP Error: ' + xhr.status);
                //     return;
                //   }
                //   json = JSON.parse(xhr.responseText);
                //   if (!json || typeof json.location != 'string') {
                //     failure('Invalid JSON: ' + xhr.responseText);
                //     return;
                //   }
                //   success(json.location);
                // };
                // formData = new FormData();
                // formData.append('file', blobInfo.blob(), blobInfo.filename());
                // xhr.send(formData);
              }
            }}
            onChange={this.handleGetRichText}
          />
        </Row>
      </div>
    );
  }
}
