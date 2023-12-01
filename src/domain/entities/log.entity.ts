export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  // "{"level": "low", "message":"Hola", "createdAt": "123213213tz2312321"}" => esto es lo que recibo un string
  // Por eso uso el parse para que me regrese unn objeto
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  };
}
