import winston from "winston";

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
            }),
          ),
        }),
      ],
    });
  }

  /**
   * Logs an informational message with the given text.
   * @param {string} message - The informational message to be logged.
   */
  info(message: string): void {
    this.logger.info(message);
  }

  /**
   * Logs a warning message with the given text.
   * @param {string} message - The warning message to be logged.
   */
  warn(message: string): void {
    this.logger.warn(message);
  }

  /**
   * Logs an error message with the given text.
   * @param {string} message - The error message to be logged.
   */
  error(message: string): void {
    this.logger.error(message);
  }
}

export const logger = new Logger();
