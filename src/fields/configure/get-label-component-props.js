import includes from 'lodash/includes';

export default ({ htmlId, required, path, schema }) => {
  let rv = {
    htmlFor: htmlId,
    required: includes(required, path)
  };

  if (schema.type === 'date') {
    rv = { ...rv, shrink: true };
  }

  return rv;
};
