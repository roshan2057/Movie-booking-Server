var nameformat = /^[a-zA-Z\s]*$/;

var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var phoneformat = /^((98|97)\d{8})$/;
var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const Validatename = (name) => {
  if (name.trim() == "") {
    return false;
  } else if (!nameformat.test(name)) {
    return false;
  } else {
    return true;
  }
};

export const Validatephone = (phone) => {
  if (phone.trim() == "") {
    return false;
  } else if (!phoneformat.test(phone)) {
    return false;
  } else {
    return true;
  }
};

export const Validateemail = (email) => {
  if (email.trim() == "") {
    return false;
  } else if (!emailFormat.test(email)) {
    return false;
  } else {
    return true;
  }
};
export const Validatepassword = (password) => {
  if (!passwordformat.test(password)) {
    return false;
  } else {
    return true;
  }
};
