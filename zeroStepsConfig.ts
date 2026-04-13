import dotenv from "dotenv";
dotenv.config();

export const zeroStepConfig = {
  TOKEN: process.env.ZEROSTEP_TOKEN || "",
  LOGS_ENABLED: false,
};
