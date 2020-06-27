var Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production"])
    .default("development"),
  PROTOCAL: Joi.string().default("http://"),
  BASE_URL: Joi.string().default("localhost"),
  EXTERNAL_URL: Joi.string().default("http://localhost:5000/"),
  PORT: Joi.number().default(3000),
  LOGGER: Joi.string().default(true),
  SECRET_KEY: Joi.string()
    .default("TEST!@!#$$%@%$KEY")
    .description("secret key required"),
  MONGOOSE_URL: Joi.string()
    .default("mongodb://localhost:27017/xdb")
    .description("Mongo Path"),
  MONGO_DEBUG: Joi.boolean()
    .default(true)
    .description("Mongo Debug")
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  protocol: envVars.PROTOCAL,
  base_url: envVars.BASE_URL,
  externalUrl: envVars.EXTERNAL_URL,
  port: envVars.PORT,
  logger: envVars.LOGGER,
  secretKey: envVars.SECRET_KEY,
  mongo: {
    MONGO_PATH: envVars.MONGOOSE_URL,
    MONGO_DEBUG: envVars.MONGO_DEBUG
  }
};

module.exports = config;
