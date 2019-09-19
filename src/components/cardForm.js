import React from "react";
import Joi from "joi-browser";
import PhoneSimulator from "./phoneSimulator";
import CardSimulator from "./cardSimulator";
import { getCardById, saveCard } from "../services/fakeCardService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputField from "./common/inputField";
import Form from "./common/form";

class CardForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        description: "",
        buttonText: "",
        landingPage: "",
        isVisible: false
      },
      errorMessages: {},
      simulator: {
        display: false,
        title: "",
        description: "",
        buttonText: ""
      }
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    landingPage: Joi.string().required(),
    buttonText: Joi.string().required(),
    //.error(new Error("El texto del botón es obligatorio.")),
    isVisible: Joi.boolean().required()
  };
  errorMessages = {
    title: "El título es obligatorio.",
    description: "La Descripción es obligatoria.",
    buttonText: "El texto del botón es obligatorio.",
    landingPage: "La Landing Page es obligatoria.",
    isVisible: "El campo de visibilad es obligatorio."
  };

  mapToViewModel(card) {
    return {
      title: card.title,
      description: card.description,
      buttonText: card.buttonText,
      landingPage: card.landingPage,
      isVisible: card.isVisible
    };
  }

  async populateCard() {
    try {
      const cardId = this.props.match.params.id;
      if (cardId === "new") return;

      const card = await getCardById(cardId);
      this.setState({ formData: this.mapToViewModel(card) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("not-found");
      // If using history.push() redirection to an invalid card._id page
      // when clicking the back button will produce an inifinte loop to the "/not-found page"
    }
  }

  async componentDidMount() {
    await this.populateCard();
  }

  doSubmit = () => {
    console.log("Enviado --> ", this.state.formData);
    saveCard(this.state.formData);
    this.props.history.push("/cards");
  };

  handleRadioBoolean = name => {
    let formData = { ...this.state.formData };
    formData[name] = !formData.isVisible;
    this.setState({ formData });
  };

  enableButton = () => {};

  handleSimulator = card => {
    const { title, description, buttonText } = card;
    const simulator = { ...this.state.simulator };
    simulator.title = title;
    simulator.description = description;
    simulator.buttonText = buttonText;
    simulator.display = true;
    this.setState({ simulator });
    console.log(" display it --> ", simulator);
  };
  // handleSimulator = card => {
  //   const simulator = {
  //     display: true,
  //     title: card.title,
  //     description: card.description,
  //     buttonText: card.buttonText
  //   };
  //   this.setState({ simulator });
  //   console.log(" display it --> ", simulator);
  // };

  render() {
    console.log("from the form: ", getCardById(this.props.match.params.id));
    //const { match, history } = this.props;
    const { formData, errorMessages, simulator } = this.state;
    console.log("Checkbox value: ", formData.isVisible);
    return (
      <div className="row">
        <div style={{ marginTop: 20 }} className="col-lg-7">
          <h1 className="text-center">
            {" "}
            {this.props.match.params.id === "new"
              ? "Formulario de Campaña"
              : formData.title}{" "}
          </h1>

          <form onSubmit={this.handleSubmit}>
            <InputField
              name="title"
              label="Título"
              value={formData.title}
              error={errorMessages.title}
              onChange={this.handleChange}
              autoFocus
              // import directly without the render helper
              // in order to apply the autoFocus attribute
            />
            {this.renderTextAreaField("description", "Descripción")}

            <div className="col form-group">
              <label htmlFor="landingPage">Landing Page (url)</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">
                    https://
                  </span>
                </div>
                <input
                  name="landingPage"
                  value={formData.landingPage}
                  type="text"
                  error={errorMessages.landingPage}
                  onChange={this.handleChange}
                  className="form-control"
                  id="landingPage"
                  aria-describedby="basic-addon3"
                />
              </div>
              {errorMessages.landingPage && (
                <div className="alert alert-danger mb-3">
                  {errorMessages.landingPage}
                </div>
              )}
            </div>
            {/* {this.renderInputField("landingPage", "Landing Page (url)", "url")} */}
            {this.renderInputField("buttonText", "Texto del botón")}
            {/* {this.renderRadioBoolean} */}

            <div className="row justify-content-around">
              <div className="col-4">
                <div className="form-check">
                  <input
                    defaultChecked
                    value={formData.isVisible}
                    onChange={() => this.handleRadioBoolean("isVisible")}
                    name="isVisible"
                    id="isVisible0"
                    className="form-check-input"
                    type="radio"
                  />
                  <label className="custom-check-label" htmlFor="isVisible0">
                    Oculto{" "}
                    <span>
                      <FontAwesomeIcon icon={faEyeSlash} />
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    value={formData.isVisible}
                    onChange={() => this.handleRadioBoolean("isVisible")}
                    name="isVisible"
                    id="isVisible1"
                    className="form-check-input"
                    type="radio"
                  />
                  <label className="form-check-label" htmlFor="isVisible1">
                    Visible{" "}
                    <span>
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: "#4f87ce" }}
                      />
                    </span>
                  </label>
                </div>
              </div>
              <div className="col-4">
                <button
                  //disabled={this.validate()}
                  className="btn-lg"
                  style={{
                    marginBottom: 20,
                    backgroundColor: "#61c8ec",
                    fontWeight: "bold"
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div style={{ marginTop: 20 }} className="col-4">
          <div className="row">
            <button
              //disabled={this.validate()}
              className="btn"
              style={{
                marginBottom: 20,
                backgroundColor: "#61c8ec",
                fontWeight: "bold"
              }}
              onClick={() => this.handleSimulator(formData)}
            >
              Actualizar simulador
            </button>
          </div>
          <div className="row  justify-content-center">
            <div className="col-auto">
              <PhoneSimulator>
                {simulator.display && (
                  <CardSimulator
                    title={simulator.title}
                    description={simulator.description}
                    buttonText={simulator.buttonText}
                  />
                )}
              </PhoneSimulator>
            </div>
          </div>
          {/* <div className="col-offset-2">
            <Simulator
              title={simulator.title}
              description={simulator.description}
              buttonText={simulator.buttonText}
              display={simulator.display}
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default CardForm;
