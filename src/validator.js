// TODO: Probably should group all modules into a modules dir

export default {
  checkValue(value, options) {
    if (options.required && (value === undefined || value === null || value.toString().trim().length === 0)) return 'Required';
    if (options.maxLength && value.length > options.maxLength) return `Value must be less than ${options.maxLength} characters`;
    // if ((options.sameAs === '' || options.sameAs) && options.sameAs !== value) return 'Passwords must match';
    // if (options.minLength && value.length < options.minLength) return `Value must be at least ${options.minLength} characters`;
    // if (options.password && !value.toString().match(/[A-z]/)) return 'Password must contain lowercase';
    // if (options.password && !value.toString().match(/[A-Z]/)) return 'Password must contain uppercase';
    // if (options.password && !value.toString().match(/\d/)) return 'Password must contain number';
    // if (options.futureDate && moment(value).format('YYYY-MM-DD') < moment(TimeSync.serverTime()).format('YYYY-MM-DD')) return `Date must be future`;
    // if (options.futureDateTime && moment(value).format('YYYY-MM-DD HH:mm') < moment(TimeSync.serverTime()).format('YYYY-MM-DD HH:mm')) return `Date must be future`;
    // if (options.dateGreaterThenOrEqual && value !== undefined && moment(value).format('YYYY-MM-DD') < moment(options.dateGreaterThenOrEqual).format('YYYY-MM-DD')) return `Date must be at earliest ${moment(options.dateGreaterThenOrEqual).format('DD-MMM-YYYY')}`;
    // if (options.percent && value !== undefined && (Number(value) > 100 || Number(value) < 0)) return 'Value must be percentage';
    // if (options.greaterThan !== undefined && value <= options.greaterThan) return 'Must be greater than ' + options.greaterThan;
    // if (options.email && !value.toString().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return 'Invalid email address';
    return false;
  },

  validate(entity, state, setState, field, options) {
    const { validationState, validationError } = Object.assign({}, state);
    const error = this.checkValue(entity[field], options);
    if (error) {
      validationState[field] = true;
      validationError[field] = error;
    }
    else {
      validationState[field] = false
      validationError[field] = error;
    }
    setState({ ...state, validationState: validationState, validationError: validationError });
    return error;
  },

  validateAll(entity, state, setState, fields) {
    let valid = true;
    fields.forEach(f => {
      const error = this.validate(entity, state, setState, f.field, f.options);
      if (error) valid = false;
    })
    return valid;
  }
}
