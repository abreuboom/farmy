import "../form.css";

import React, { Component } from "react";

import ImageUploader from "react-images-upload";
import { Link } from "react-router-dom";
import axios from "axios";
import { uploadImg } from "../actions/storage";
import { userStore } from "../stores/UserStore";

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
      produceList: [],
      pictureURI: "",
      prediction: {},
      gettingPrediction: false
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop([picture]) {
    let reader = new FileReader();
    document.reader = reader;
    reader.onloadend = () => {
      this.setState({
        gettingPrediction: true,
        picture: picture,
        pictureURI: reader.result
      });

      document.getElementById("img-uploader").display = "none";

      axios
        .post("api/predict", { dataURI: reader.result })
        .then(res => {
          console.log(res);

          this.setState({
            gettingPrediction: false,
            prediction: res.data,
            produce: res.data.outputs[0].data.concepts[0].name
          });
        })
        .catch(e => console.log(e.response));
    };
    reader.readAsDataURL(picture);
  }

  handleChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    document.getElementById("loading").style.display = "block";

    e.preventDefault();
    let { price, title, quantity, units, produce } = this.state;
    // do something here
    uploadImg(this.state.picture).then(snapshot => {
      console.log(snapshot.metadata.fullPath);
      axios
        .post("api/listings", {
          price,
          title,
          quantity,
          units,
          produce: this.state.produceList.find(elem => elem.name === produce)
            ? this.state.produceList.find(elem => elem.name === produce)
                .produce_id
            : produce,
          lister: userStore.user.id,
          img_link: snapshot.metadata.fullPath
        })
        .then(res => {
          console.log(res);
          this.props.getData();
          document.getElementById("loading").style.display = "none";
          this.props.history.push("/");
        })
        .catch(e => {
          snapshot
            .ref()
            .delete()
            .then(() => {
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
    let { prediction } = this.state;
    let concepts = [];
    if (prediction.outputs) {
      concepts = prediction.outputs[0].data.concepts;
    }

    return (
      <div className="container">
        <div id="loading">
          <h1>adding to farmy...</h1>
        </div>
        <div className="upload-form" id="upload">
          <form onSubmit={this.handleSubmit}>
            <div id="img-uploader">
              <ImageUploader
                withIcon={false}
                buttonText="Upload a Picture"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".png, .heic"]}
                maxFileSize={5242880}
                singleImage={true}
              />
            </div>
            <img id="upload-preview" style={{}} src={this.state.pictureURI} />
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
                {!concepts.length &&
                  this.state.produceList.map(elem => (
                    <option value={elem.name} key={elem.name} />
                  ))}
                {concepts.length &&
                  concepts.map(elem => (
                    <option value={elem.name} key={elem.name} />
                  ))}
              </datalist>
            </label>

            <button action="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
