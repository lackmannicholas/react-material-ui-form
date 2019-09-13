// Library
import React from 'react';
import SchemaForm from './Form';
// TODO: why is putting this in our library blowing the form up?
//import { SchemaForm } from '@oceaneering-gds/components-core';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const styles = theme => ({
  field: {},
  formButtons: {},
  root: {},
});
 
const schema = {
  "title": "Port form",
  "description": "A simple form example.",
  "type": "object",
  "properties": {
    "PortID": {
      "type": "integer",
      "title": "ID"
    },
    "PortName": {
      "type": "string",
      "title": "Port Name"
    },
    "Status": {
      "type": "string",
      "title": "Status",
    },
    "FullPortStyle": {
        "type": "string",
        "title": "Full Port Style",
    },
    "Country": {
        "type": "string",
        "title": "Country",
    },
    "CountryCode": {
        "type": "string",
        "title": "CountryCode",
    },
    "TimeZone": {
        "type": "string",
        "title": "TimeZone",
    },
    "UNLOCODE": {
        "type": "string",
        "title": "UNLOCODE",
    },
    "WSPort": {
        "type": "string",
        "title": "WSPort",
    },
    "LatitudeDecimal": {
        "type": "string",
        "title": "Latitude",
    },
    "LongitudeDecimal": {
        "type": "string",
        "title": "Longitude",
    },
    "DryBulkFacilities": {
        "type": "boolean",
        "title": "Dry Bulk Facilities",
    },
    "LPGFacilities": {
        "type": "boolean",
        "title": "LPG Facilities",
    },
    "LNGFacilities": {
        "type": "boolean",
        "title": "LNG Facilities",
    },
    "LiquidFacilities": {
        "type": "boolean",
        "title": "Liquid Facilities",
    },
    "MaxBeam": {
        "type": "integer",
        "title": "Max Beam",
    },
    "MaxDWT": {
        "type": "integer",
        "title": "Max DWT",
    },
    "MaxLOA": {
        "type": "integer",
        "title": "Max LOA",
    },
    "MaxOffshoreBCM": {
        "type": "integer",
        "title": "Max Offshore BCM",
    },
    "MaxOffshoreDraught": {
        "type": "integer",
        "title": "Max Offshore Draught",
    },
    "MaxOffshoreDWT": {
        "type": "integer",
        "title": "Max Offshore DWT",
    },
    "MaxOffshoreLOA": {
        "type": "integer",
        "title": "Max Offshore LOA",
    },
    "MaximumDraft": {
        "type": "integer",
        "title": "Maximum Draft",
    },
  }
}
 
const uiSchema = {
    "MaxDWT": {
        "ui:widget": "updown",
    },
    "MaxLOA": {
        "ui:widget": "updown",
    },
    "MaxOffshoreBCM": {
        "ui:widget": "updown",
    },
    "MaxOffshoreDraught": {
        "ui:widget": "updown",
    },
    "MaxOffshoreDWT": {
        "ui:widget": "updown",
    },
    "MaxOffshoreLOA": {
        "ui:widget": "updown",
    },
    "MaximumDraft": {
        "ui:widget": "updown",
    },
}

function PortForm (props){
    const [state] = React.useState({
        schema: schema,
        uiSchema: uiSchema,
    });

    const GET_VALIDATION = gql`
      query Validations($formName: String!) {
          validations(formName: $formName) {
              PortName {
                validator
                arguments
                message
                passIfEmpty
              }
              Status {
                validator
                arguments
                message
                passIfEmpty
              }
          }
      }
    `;
    const validation = useQuery(GET_VALIDATION, {
        variables: { formName: 'portForm' },
    });

    const GET_PORT = gql`
      query MasterPort($portName: String!, $limit: Int) {
        masterPort(PortName: $portName, limit: $limit) {
            id
            PortID
            PortName
            Status
            FullPortStyle
            Country
            CountryCode
            TimeZone
            UNLOCODE
            WSPort
            LatitudeDecimal
            LongitudeDecimal
            DryBulkFacilities
            LPGFacilities
            LNGFacilities
            LiquidFacilities
            MaxBeam
            MaxDWT
            MaxLOA
            MaxOffshoreBCM
            MaxOffshoreDraught
            MaxOffshoreDWT
            MaxOffshoreLOA
            MaximumDraft
        }
      }
    `;
    const port = useQuery(GET_PORT, {
        variables: { portName: 'Funafuti', limit: 1 },
    });
    const onSubmit = (value, callback) => {
      console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
    }
    const onCancel = () => {
        console.log('on reset being called');
    }
    const onFormChanged = ({ formData }) => {
        console.log('onFormChanged: ',formData); // eslint-disable-line no-console
    }
    const onUpload = (value) => {
        console.log('onUpload: ', value); // eslint-disable-line no-console
    }
    return (
        <SchemaForm
            schema={state.schema}
            uiSchema={state.uiSchema}
            formData={port.loading ? port.data : port.data.masterPort[0]}
            validationFields={validation.loading ? validation.data : validation.data.validations}
            onCancel={onCancel}
            onSubmit={onSubmit}
            onUpload={onUpload}
            onChange={onFormChanged}
            submitOnEnter
            activityIndicatorEnabled
    />
    );
}

export default PortForm;