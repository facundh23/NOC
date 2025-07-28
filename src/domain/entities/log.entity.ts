//? La entidad es algo que va a lelgar a la base de datos

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, createdAt = new Date(), origin } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  // "{"level": "low", "message":"Hola", "createdAt": "123213213tz2312321"}" => esto es lo que recibo un string
  // Por eso uso el parse para que me regrese un objeto
  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({ 
      message, 
      level, 
      origin, 
      createdAt: new Date(createdAt) 
    });
    return log;
  };

  // Recibo un objeto en el que las keys van a ser de tipo string
  // y el valor puede ser de tipo any
  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    });

    return log;
  };
}
