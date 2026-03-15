import { faker } from "@faker-js/faker";

export class FakerHelper {
  /**
   * Generates a random first name.
   * @returns {string} - The generated first name.
   */
  public static generateFirstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generates a random last name.
   * @returns {string} - The generated last name.
   */
  public static generateLastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generates a random email address.
   * The generated email address is in the format of a@b.c where a and b are random strings and c is a random top-level domain.
   * @returns {string} - The generated email address.
   */
  public static generateEmail(): string {
    return faker.internet.email();
  }

  /**
   * Generates a random password.
   * The generated password will have a minimum length of the given minLength.
   * If the generated password is shorter than the given minLength, it will be padded with alphanumeric characters to reach the given minLength.
   * @param {number} [minLength=6] - The minimum length of the generated password.
   * @returns {string} - The generated password.
   */
  public static generatePassword(minLength: number = 6): string {
    let password = faker.internet.password({ length: minLength });
    if (password.length < minLength) {
      password += faker.string.alphanumeric(minLength - password.length);
    }
    return password;
  }

  /**
   * Generates a random customer signup data.
   * The generated customer signup data will have a random first name, last name, email, and password.
   * The generated password will have a minimum length of 8 characters.
   * @returns {{ firstName: string, lastName: string, email: string, password: string }}
   */
  public static generateCustomerSignupData(): {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } {
    return {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      email: this.generateEmail(),
      password: this.generatePassword(8),
    };
  }
}
