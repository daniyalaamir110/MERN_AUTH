export const validateSignup = formData => {
  let isValid = true;
  let errors = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    password2: "",
  };
  for (let key in formData) {
    if (!formData[key]) {
      errors[key] = "Required field";
      isValid = false;
    }
  }
  if (!errors.password && (formData.password.length < 8 || formData.password.length > 20)) {
    errors.password = "Password must be 8 to 20 characters long";
    isValid = false;
  }
  if (!errors.password2 && formData.password !== formData.password2) {
    errors.password = "Password must be 8 to 20 characters long";
    isValid = false;
  }
  return { isValid, errors };
}

export const validateSignin = formData => {
  let isValid = true;
  let errors = {
    username: "",
    password: "",
  };
  for (let key in formData) {
    if (!formData[key]) {
      errors[key] = "Required field";
      isValid = false;
    }
  }
  return { isValid, errors };
}
