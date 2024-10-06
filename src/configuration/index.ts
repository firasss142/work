require("dotenv").config();

export const DATA_BASE_CONFIGURATION = {
  mongoConnectionString: (process.env.CLEAN_NEST_MONGO_CONNECTION_STRING as string)
};
export const MAILER_HOST = process.env.MAILER_HOST;
export const MAILER_PORT = process.env.MAILER_PORT;
export const MAILER_USER = process.env.MAILER_USER;
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD;
export const MAILER_SENDER = process.env.MAILER_SENDER;
export const SECRET_KEY = process.env.SECRET_KEY;
export const BASE_URL = process.env.BASE_URL;
export const PROVIDER = process.env.PROVIDER;
export const SIGNER = process.env.SIGNER;
export const EAS_CONTRACT_ADDRESS = process.env.EAS_CONTRACT_ADDRESS;
export const CONTRACT_SCHEMA_UID = process.env.CONTRACT_SCHEMA_UID;
export const DEVELOPER_SCHEMA_UID = process.env.DEVELOPER_SCHEMA_UID;
export const RESOLVER_CONTRACT_ADDRESS=process.env.RESOLVER_CONTRACT_ADDRESS

