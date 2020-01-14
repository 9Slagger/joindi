import React from 'react'
import Fuse from 'fuse.js';
import { Input, Card } from 'antd';
const { Search } = Input;


class SearchEvents extends React.Component {
  state = {
    searchList:[],
    data: [
      {
        "id": 1,
        "eventName": "วิ่งไล่ลุง",
        "catagory": {
          "id": 1,
          "catagory_name": "Popular"
        },
        "tag": [
          {
            "id": 1,
            "tag_name": "Coding"
          },
          {
            "id": 2,
            "tag_name": "Run"
          }
        ]
      },
      {
        "id": 1,
        "eventName": "เดินเชียร์ลุง",
        "catagory": {
          "id": 1,
          "catagory_name": "Hot"
        },
        "tag": [
          {
            "id": 3,
            "tag_name": "Walk"
          }
        ]
      }
    ]
  }

  handleSearch = (e) => {
    const fuse = new Fuse(this.state.data, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "eventName",
        "catagory_name"
      ]
    });
    this.setState({searchList:fuse.search(e)})
  }


  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={this.handleSearch}
          style={{ width: "500px" }}
        />
        <br />
        {this.state.searchList.map(element => (

        <Card size="small" title={element.eventName} style={{ width: 300 }} key={element.id}>
          <p>{element.catagory.catagory_name}</p>
    
    </Card>
        ))}
      </div>
    )
  }
}

export default SearchEvents