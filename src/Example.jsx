// Library
import React from 'react';
import SchemaForm from './Form';
//import { SchemaForm } from '@oceaneering-gds/components-core';
import mapValues from 'lodash/mapValues';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  field: {},
  formButtons: {},
  root: {},
});
 
const schema = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "label": "Age",
      "error": "true",
    },
    "selectTest": {
      "type": "string",
      "label": "Multi Select",
      "enum": [
        "A",
        "B",
        "C"
      ]
    },
    "vessels": {
      "type": "string",
      "enum": [
        "Vessel A",
        "Vessel B",
        "Vessel C"
      ]
    }
  }
}
 
const uiSchema = {
  "firstName": {
    "ui:autofocus": true,
    "ui:emptyValue": ""
  },
  "age": {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "This description will be in a Popover"
  },
  "selectTest": {
    "ui:widget": "material-multiselect",
    "ui:label": "Multi Select",
  },
  "vessels": {
    "ui:widget": "select",
    "ui:label": "Multi Select",
    "ui:title": "Vessels"
  },
}
 
const initialFormData = {
  "firstName": "Chuck",
  "lastName": "Norris",
  "age": 75,
  "vessels": "Vessel A"
}

class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filter: initialFormData,
        validationState: mapValues(initialFormData, () => { return false }),  // Error prop expects bool
        validationError: { firstName: '', lastName: '', age: '' }, // getInitialFilter(),
        schema: schema,
        uiSchema: uiSchema,
        formData: initialFormData
      };

      this.fields = [
        {
          field: 'firstName',
          options: { required: true }
        },
        {
          field: 'lastName',
          options: { required: true }
        }
      ];
    }
    onSubmit = (value, callback) => {
      console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
    }
    onCancel = () => {
        console.log('on reset being called');
    }
    onFormChanged = ({ formData }) => {
        console.log('onFormChanged: ',formData); // eslint-disable-line no-console
    }
    onUpload = (value) => {
        console.log('onUpload: ', value); // eslint-disable-line no-console
    }
    render() {
        return (
          <SchemaForm
              schema={this.state.schema}
              uiSchema={this.state.uiSchema}
              formData={initialFormData}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              onUpload={this.onUpload}
              onChange={this.onFormChanged}
              validationFields={this.fields}
              validationState={this.state.validationState}
              validationError={this.state.validationError}
              submitOnEnter
              activityIndicatorEnabled
        />
        );
    }
}

export default Example;