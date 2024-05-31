const isValidFields = (payload, fields) => {
    let valid = true;
    const keys = Object.keys(payload);
    if (fields.length !== keys.length) {
      return false;
    }
    for (let i = 0; i < keys.length; i++) {
      if (!fields.find((f) => f === keys[i])) {
        valid = false;
        break;
      }
    }
    return valid;
  };
  
const isValidUpdateFields = (payload, fields) => {
  let valid = true;
  const keys = Object.keys(payload);
  for (let key of keys) {
    if (!fields.includes(key)) {
      valid = false;
      break;
    }
  }
  return valid ;
}

  module.exports = { isValidFields,isValidUpdateFields };
  