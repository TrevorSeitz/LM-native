import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import submit from "../submit";
import axiosClient from "../axiosClient";
import * as actions from "../actions";
import { NavLink } from "react-router-dom";
import HandleFileSelectFunction from "../components/FileSelectFunction";

class NewPlaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {
        id: this.props.match.params.id,
        image: null,
        fileName: null,
        name: "",
        venue: "",
        latitude: "",
        longitude: "",
        contactName: "",
        contactPhone: "",
        email: "",
        likes: "",
        permit: "",
        description: ""
      },
      selectedPlaceImageFiles: [],
      submitFormProgress: 0,
      isSubmittingForm: false,
      didFormSubmissionComplete: false,
      center: this.props.center
    };
  }

  handleChange = e => {
    const place = this.state.place;
    place[e.target.name] = e.target.value;
  };

  handleSubmit = e => {
    e.preventDefault();

    const place = this.state.place;
    this.setState(
      {
        isSubmittingForm: true,
        place: place
      },
      () => {
        this.submitForm(this);
      }
    );
  };

  submitForm = () => {
    const submitMethod = "post";
    const url = "/api/places";
    axiosClient[submitMethod](url, this.buildFormData(), {
      onUploadProgress: progressEvent => {
        let percentage = (progressEvent.loaded * 100.0) / progressEvent.total;
        this.setState({
          submitFormProgress: percentage
        });
      }
    })
      .then(response => {
        this.props.getLocations(
          null,
          this.props.bounds[0],
          this.props.bounds[1],
          this.props.bounds[2],
          this.props.bounds[3]
        );
        this.props.history.push({
          pathname: "/places/{this.state.place.id}",
          state: {
            place: this.state.place,
            places: this.props.allPlaces
          }
        });
      })
      .catch(error => {
        const place = this.state.place;
        this.setState({
          isSubmittingForm: false,
          submitFormProgress: 0,
          place: place
        });
      });
  };

  renderUploadFormProgress = () => {
    if (this.state.isSubmittingForm === false) {
      return null;
    }
    return (
      <div className="progress">
        <div
          className={
            "progress-bar progress-bar-info progress-bar-striped" +
            (this.state.submitFormProgress < 100 ? "active" : "")
          }
          role="progressbar"
          aria-valuenow={this.state.submitFormProgress}
          areaValuemin="0"
          areaValuemax="100"
          style={{ width: this.state.submitFormProgress + "%" }}
        >
          {this.state.submitFormProgress}
        </div>
      </div>
    );
  };

  buildFormData = () => {
    const formData = new FormData();

    formData.append("place[fileName]", this.state.place.image.name);
    formData.append("place[name]", this.state.place.name);
    formData.append("place[venue]", this.state.place.venue);
    formData.append("place[latitude]", this.state.place.latitude);
    formData.append("place[longitude]", this.state.place.longitude);
    formData.append("place[contactName]", this.state.place.contactName);
    formData.append("place[contactPhone]", this.state.place.contactPhone);
    formData.append("place[email]", this.state.place.email);

    formData.append(this.state.place.image, this.state.place.image.name);
    return formData;
  };

  // this is the call to external function to retrieve the lat long of the photo
  // the proccess was moved to components/FileSelectFunction.js.
  getLatLong = e => {
    e.persist();
    HandleFileSelectFunction(e, this.props);
  };

  render() {
    const { reset } = this.props;
    return (
      <div>
        <NavLink
          to={{
            pathname: "/places/all_contacts",
            allPlaces: { allPlaces: this.props.allPlaces }
          }}
        >
          <button className="button">See Contacts</button>
        </NavLink>

        <NavLink
          to={{
            pathname: "/places/visible_locations",
            state: { places: this.props.places }
          }}
          exact
        >
          <button className="button">See locations</button>
        </NavLink>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="fileUpload">
              <div>
                <label>File Upload </label>
                <input
                  className="input"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  disabled={this.state.isSubmittingForm}
                  onChange={this.getLatLong}
                />
              </div>
            </div>
            <div>
              <label>Lat/Long</label>
              <div>
                <Field
                  className="input"
                  name="lat"
                  component="input"
                  type="text"
                  placeholder={
                    this.props.fileLat === 0 ? "" : this.props.fileLat
                  }
                  onChange={this.handleChange}
                />
                <Field
                  className="input"
                  name="long"
                  component="input"
                  type="text"
                  placeholder={
                    this.props.fileLong === 0 ? "" : this.props.fileLong
                  }
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Location Name</label>
              <div>
                <Field
                  className="input"
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Venue/Region</label>
              <div>
                <Field
                  className="input"
                  name="venue"
                  component="input"
                  type="text"
                  placeholder="Venue"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Contact Name</label>
              <div>
                <Field
                  className="input"
                  name="contactName"
                  component="input"
                  type="text"
                  placeholder="Contact Name"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Contact Phone #</label>
              <div>
                <Field
                  className="input"
                  name="contactPhone"
                  component="input"
                  type="number"
                  placeholder="Contact Phone #"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Contact Email</label>
              <div>
                <Field
                  className="input"
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Description and Notes</label>
              <div>
                <Field
                  className="input"
                  name="description"
                  component="textarea"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={this.props.pristine}
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                disabled={this.props.pristine}
                onClick={reset}
              >
                Clear Values
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fileLat: state.latLngReducer.lat,
    fileLong: state.latLngReducer.lng,
    places: state.getLocationsReducer.places,
    allPlaces: state.getLocationsReducer.allPlaces,
    center: state.mapReducer.center,
    bounds: state.mapReducer.bounds
  };
};

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: "newPlace", // a unique identifier for this form
    onSubmit: submit
  })(NewPlaceForm)
);
