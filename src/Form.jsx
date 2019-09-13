import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { generate } from 'shortid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import formStyles from './form-styles';
import FormField from './FormField';
import updateFormData, {
  addListItem,
  removeListItem,
  moveListItem
} from './helpers/update-form-data';
import getValidationResult from './helpers/validation';
import DefaultErrorList from './ErrorList';
import FormButtons from './FormButtons';
import validator from '../form/validator';

class Form extends React.Component {
  static defaultProps = {
    uiSchema: {},
    showErrorList: false,
    showHelperError: true,
    ErrorList: DefaultErrorList
  };

  // binding setState to this context
  setState = this.setState.bind(this);

  state = {
    data: this.props.formData,
    errors: getValidationResult(this.props.schema, this.props.formData),
    id: generate(),
    validationFields: this.props.validationFields,
    validationState: {},
    validationError: {},
  };

  componentWillReceiveProps = nextProps => {
    let errors;
    if (!isEqual(nextProps.schema, this.props.schema)) {
      errors = {};
    } else {
      errors = getValidationResult(this.props.schema, nextProps.formData);
    }
    this.setState({
      errors,
      data: nextProps.formData,
      validationFields: nextProps.validationFields
    });
  };

  onChange = field => value => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const data = updateFormData(this.state.data, field, value);
    const validations = this.state.validationFields[field];
    
    if(validations)
      validator.validate(data, this.state, this.setState, field, validations);

    this.setState(
      {
        data,
        errors: getValidationResult(this.props.schema, data)
      },
      this.notifyChange
    );
  };

  onMoveItemUp = (path, idx) => () => {
    this.setState(
      prevState => ({ data: moveListItem(prevState.data, path, idx, -1) }),
      this.notifyChange
    );
  };

  onMoveItemDown = (path, idx) => () => {
    this.setState(
      prevState => ({ data: moveListItem(prevState.data, path, idx, 1) }),
      this.notifyChange
    );
  };

  onDeleteItem = (path, idx) => () => {
    this.setState(
      prevState => ({ data: removeListItem(prevState.data, path, idx) }),
      this.notifyChange
    );
  };

  onAddItem = (path, defaultValue) => () => {
    this.setState(
      prevState => ({
        data: addListItem(prevState.data, path, defaultValue || '')
      }),
      this.notifyChange
    );
  };

  onSubmit = (e) => {
    const { onSubmit } = this.props;
    const { data } = this.state;
    
    if(!this.isFormValid()) return;

    onSubmit({ formData: data });
  };

  isFormValid = () => {
    let valid = true;
    const {validationState} = this.state;
    Object.keys(validationState).map((field, error) => {
      if(validationState[field]) {
        valid = false;
        return;
      }
    });

    return valid;
  }

  notifyChange = () => {
    const { onChange } = this.props;
    const { data } = this.state;
    if (onChange) {
      onChange({ formData: data });
    }
  };

  render() {
    const {
      classes,
      formData,
      onSubmit,
      onChange,
      onCancel,
      cancelText,
      submitText,
      showErrorList,
      ErrorList,
      buttonProps,
      ...rest
    } = this.props;
    const { errors, id, data, validationFields, validationState, validationError, validator } = this.state;
    return (
      <Paper className={classes.root}>
        {showErrorList ? <ErrorList errors={errors} field={id} /> : null}
        <div className={classes.field}>
          <FormField
            path=""
            data={data}
            id={id}
            className={classes.formfield}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            errors={errors}
            onMoveItemUp={this.onMoveItemUp}
            onMoveItemDown={this.onMoveItemDown}
            onDeleteItem={this.onDeleteItem}
            onAddItem={this.onAddItem}
            validationFields={this.state.validationFields}
            validationState={this.state.validationState}
            validationMessage={this.state.validationError}
            validator={validator}
            {...rest}
          />
        </div>
        <FormButtons
          onSubmit={this.onSubmit}
          hasExternalOnSubmit={!!onSubmit}
          onCancel={onCancel}
          classes={classes}
          cancelText={cancelText}
          submitText={submitText}
          buttonProps={buttonProps}
        />
      </Paper>
    );
  }
}
export default withStyles(formStyles)(Form);

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  classes: PropTypes.object,
  uiSchema: PropTypes.object,
  buttonProps: PropTypes.object,
  formData: PropTypes.any,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  showErrorList: PropTypes.bool,
  showHelperError: PropTypes.bool,
  ErrorList: PropTypes.object
};
