import winston, { Logger, transports } from 'winston';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

class AppLogger {
  private logger: Logger;
  private static instance: AppLogger;

  private constructor() {
    
    winston.addColors(colors);

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all:true }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: '../../logs/app.log' })
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