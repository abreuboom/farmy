import "../form.css";

import React, { Component } from "react";

import axios from "axios";
import ImageUploader from "react-images-upload";
import uuidv4 from "uuid/v4";
import { imagesRef, uploadImg } from "../actions/storage";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      quantity: "",
      units: "lbs",
      produce: "",
      picture: null,
      produceList: []
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      picture: picture[0]
    });
  }

  handleChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { price, title, quantity, units, produce } = this.state;
    // do something here
    let extension = this.state.picture.name.substr(
      this.state.picture.name.length - 4
    );
    uploadImg(this.state.picture).then(snapshot => {
      console.log(snapshot.metadata.fullPath);
      let url = "api/listings";
      axios.get("/api/users", { params: { username: "test1" } }).then(data => {
        let lister = data.data.id;
        axios
          .post(url, {
            price,
            title,
            quantity,
            units,
            produce: this.state.produceList.find(elem => elem.name === produce)
              ? this.state.produceList.find(elem => elem.name === produce)
                  .produce_id
              : produce,
            lister,
            img_link: snapshot.metadata.fullPath
          })
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e.response);
          });
      });
    });

    console.log(this.state);
  };

  componentDidMount() {
    axios.get("/api/produce").then(data => {
      this.setState({
        produceList: data.data
      });
    });
  }
  render() {
    return (
      <div className="container">
        <div className="upload-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Listing Title <br />
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Fresh Tomatoes"
                required
              />
            </label>
            <label>
              Price per unit ($) <br />
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                placeholder="2"
                required
              />
            </label>
            <label>
              Quantity <br />
              <input
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                placeholder="10"
                required
              />
            </label>
            <label htmlFor="units">
              Units <br />
              <select
                name="units"
                id="units"
                value={this.state.units}
                onChange={this.handleChange}
              >
                <option value="lbs">lbs.</option>
                <option value="count">count</option>
              </select>
            </label>
            <label>
              Produce <br />
              <input
                type="text"
                list="produce"
                name="produce"
                value={this.state.produce}
                onChange={this.handleChange}
                placeholder="Tomatoes"
                required
              />
              <datalist id="produce">
                {this.state.produceList.map(elem => (
                  <option value={elem.name} key={elem.name} />
                ))}
              </datalist>
            </label>
            <ImageUploader
              withIcon={false}
              buttonText="Upload a Picture"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".png, .heic"]}
              maxFileSize={5242880}
              singleImage={true}
            />

            <button action="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
