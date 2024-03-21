const validateData = {
  isEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  isPhoneNumber: (phoneNumber) => {
    const regex = /^0\d{9}$/;
    return regex.test(phoneNumber);
  },
  isPassword: (password) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  },
  isUsername: (username) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9\_\-]+$/;
    return regex.test(username);
  },

  // Function
  registerData: ({ email, password, fullname, phoneNumber }) => {
    if (!email || !password || !fullname || !phoneNumber) {
      return { message: "Missing required fields" };
    }
    if (!validateData.isEmail(email)) {
      return { message: "Email is invalid" };
    }
    if (!validateData.isPassword(password)) {
      return { message: "Password is invalid" };
    }
    if (!validateData.isPhoneNumber(phoneNumber)) {
      return { message: "Phone number is invalid" };
    }

    return null;
  },
  productData: ({
    ProductName,
    Price,
    Description,
    StockQuantity,
    Size,
    Color,
  }) => {
    if (
      !ProductName ||
      !Price ||
      !Description ||
      !StockQuantity ||
      !Size ||
      !Color
    ) {
      return { message: "Missing required fields" };
    }
    if (isNaN(Price) || isNaN(StockQuantity)) {
      return { message: "Price and StockQuantity must be a number" };
    }
    if (StockQuantity < 0) {
      return { message: "StockQuantity must be greater than 0" };
    }
    return null;
  },
};

export default validateData;
