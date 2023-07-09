import winston, { Logger, transports } from 'winston';

class AppLogger {
  private logger: Logger;
  private static instance: AppLogger;

  private error_conf:object = {
    level: "error",
    filename: "logs/error.log"
  }

  private app_conf:object = {
    level: "info",
    filename: "logs/app.log"
  }

  private constructor() {

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' })
      ]
    });
  }

  public static getInstance(): AppLogger{
    if (!AppLogger.instance) {
        AppLogger.instance = new AppLogger();
      }
      return AppLogger.instance;
    }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}


export default AppLogger;
export { AppLogger }