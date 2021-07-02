export const isEmailValidWithRegex = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};

export const isPhoneNumberValid = (phoneNumber) => {
  const phoneRegex = /^[0-9 ()+-]+$/;
  return phoneRegex.test(phoneNumber);
};

export const validateEmail = (email) => {
  const trimmedMail = email.trim();

  if (isEmailValidWithRegex(trimmedMail)) {
    return null;
  }

  if (trimmedMail === "") {
    return "Email is required";
  }

  return "Please enter a valid email";
};

export const validateName = (name) => {
  const trimmedName = name.trim();
  if (trimmedName === "") {
    return "Name is required";
  }
  if (/\s/.test(trimmedName)) {
    return "Invalid characters. Name should be a word";
  }
  if (/[^a-zA-Z -]/.test(trimmedName)) {
    return "Invalid characters. Only aphabets are allowed";
  }

  return null;
};

export const validatePassword = (password) => {
  if (password.trim() === "") {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateConfirmPassword = (password1, password2) => {
  if (password1 !== password2) {
    return "Passwords are not the same";
  }

  return null;
};
