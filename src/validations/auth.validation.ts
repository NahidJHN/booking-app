
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




// const login = {
//   body: Joi.object().keys({
//     email: Joi.string().required(),
//     password: Joi.string().required(),
//   }),
// };

// const logout = {
//   body: Joi.object().keys({
//     refreshToken: Joi.string().required(),
//   }),
// };

// const refreshTokens = {
//   body: Joi.object().keys({
//     refreshToken: Joi.string().required(),
//   }),
// };

// const forgotPassword = {
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//   }),
// };

// const resetPassword = {
//   query: Joi.object().keys({
//     token: Joi.string().required(),
//   }),
//   body: Joi.object().keys({
//     password: Joi.string().required().custom(password),
//   }),
// };

// const verifyEmail = {
//   query: Joi.object().keys({
//     token: Joi.string().required(),
//   }),
// };

export default {
  register,
  login
}