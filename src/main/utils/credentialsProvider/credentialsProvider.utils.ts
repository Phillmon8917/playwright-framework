import { CredentialsOptions } from "./credentialsProvider.type.ts";

export class CredentialsProvider {
 
  /**
   * Retrieves the credentials for the given key.
   * If the key is "admin", it will retrieve the admin email and password from the environment variables.
   * If the key is "agent", it will retrieve the agent email and password from the environment variables.
   * If the key is neither "admin" nor "agent", it will retrieve the customer email and password from the environment variables.
   * @param {CredentialsOptions} key - The key to retrieve the credentials for.
   * @returns {string[]} - An array containing the email and password for the given key.
   */
  public static getCredentials(key: CredentialsOptions): string[] {
    if (key === "admin") {
      return [
        process.env.ADMIN_USERNAME || "",
        process.env.ADMIN_PASSWORD || "",
      ];
    } else if (key === "agent") {
      return [
        process.env.AGENT_USERNAME || "",
        process.env.AGENT_PASSWORD || "",
      ];
    }else {
        return [
            process.env.CUSTOMER_USERNAME || "",
            process.env.CUSTOMER_PASSWORD || "",
        ];
    }
  }
}
