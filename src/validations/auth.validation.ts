
const register = {
  type: "object",
  required: ["email", "name", "password",],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    name: {
      type: "string",
    },
    password: {
      type: "string",
      minLength: 8
    },
  }

  ,
  errorMessage: {
    required: {
      email: "Please provide an email address",
      name: "Please enter your name",
      password: "Please enter your name",

    },
    properties: {
      email: "Please provide valid email address",
      name: "Please enter your name",
      password: "Password must be 8 character long",

    }

  },

}


const login = {
  type: "object",
  required: ["email", "password",],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
  }

  ,
  errorMessage: {
    required: {
      email: "Please provide an email address",
      password: "Please provide password",

    },
    properties: {
      email: "Please provide valid email address",
    }

  },

}





export default {
  register,
  login
}