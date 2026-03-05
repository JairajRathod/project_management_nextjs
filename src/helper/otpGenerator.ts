import crypto from "crypto";

export const otpGenerator = (): string => {
  return crypto.randomInt(1000, 10000).toString();
};
