import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import InputField from "./inputField";
import TextareaField from "./textareaField";

class Form extends Component {
  state = {
    formData: {},
    errorMessages: {}
  };

  validation = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.formData, this.schema, options);
    const paths = [];
    // console.log("Joi --> :", validation);
    if (error) {
      for (const item of error.details) {
        paths.push(item.path);
      }
      this.setState({ errorMessages: _.pick(this.errorMessages, paths) });
      return paths;
    } else {
      this.setState({ errorMessages: {} });
      return null;
    }
  };

  validateProperty = ({ name, value }) => {
    const errorMessages = { ...this.state.errorMessages };
    const inputField = { [name]: value };
    const subSchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(inputField, subSchema);

    if (!error) delete errorMessages[name];
    // console.log("Local :", errorMessages);
    // console.log("State :", this.state.errorMessages);
    return errorMessages;
  };

  handleSubmit = e => {
    e.preventDefault();
    const invalidForm = this.validation();
    if (invalidForm) return;
    // call the server and redirect the user
    this.doSubmit();
  };

  handleChange = e => {
    const errorMessages = this.validateProperty(e.currentTarget);
    const formData = { ...this.state.formData };
    formData[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ formData, errorMessages });
  };

  renderInputField(name, label, type = "text") {
    const { formData, errorMessages } = this.state;
    return (
      <InputField
        type={type}
        name={name}
        label={label}
        value={formData[name]}
        error={errorMessages[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderTextAreaField(name, label, rows = "5") {
    const { formData, errorMessages } = this.state;
    return (
      <TextareaField
        name={name}
        label={label}
        value={formData[name]}
        error={errorMessages[name]}
        rows={rows}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
