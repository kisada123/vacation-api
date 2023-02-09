//function ที่รับparamiter เป็น schema returnเป็น functionออกไป
module.exports = (schema) => (input) => {
  const { value, error } = schema.validate(input);
  if (error) {
    throw error;
  }
  return value;
};
