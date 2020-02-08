import "../form.css";

import React, { Component } from "react";

import ImageUploader from "react-images-upload";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      quantity: "",
      unit: "lbs",
      pictures: []
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
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

    // do something here
    console.log(this.state);
  };
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

            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
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
