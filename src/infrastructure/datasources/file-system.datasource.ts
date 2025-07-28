import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


// ? Nuestro fyle system debe implementar la firma de nuestro log data source 
export class FileSystemDataSource implements LogDataSource {

  // ? son privados solo de lectura para que no se puedan modificar
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  // Con el constructor nos aseguramos que los files existen
  constructor() {
    this.CreateLogFiles();
  }
  //? Funcion para asegurarne de lque los ficheros de logs existen y si no existen los creo, es privada porque solo queremosq ue se ise en esta funcion.
  private CreateLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    // ? Creamos todos los archivos
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  };

  //? E asincorno para cumplir con la interface
  async saveLog(newLog: LogEntity): Promise<void> {
    // ? EL JSON.stringify toma el objeto y lo serializa como un JSON
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
      return;
    }

    fs.appendFileSync(this.highLogsPath, logAsJson);
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    if (content === " ") return [];
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log));
    return logs;
  };
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
