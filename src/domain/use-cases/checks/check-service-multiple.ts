import path from "path";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import fs from "fs";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log:LogEntity){
    this.logRepository.forEach((logRepository => {
      logRepository.saveLog(log)
    }))
  }
  async execute(url: string): Promise<boolean> {
    const currentFilePath = __filename;

    const currentFilePathDef = fs.realpathSync(currentFilePath);
    const currentFileName = path.basename(currentFilePathDef);
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: currentFileName,
      });
      this.callLogs(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessge = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessge,
        level: LogSeverityLevel.high,
        origin: currentFileName,
      });
      this.callLogs(log);
      this.errorCallback && this.errorCallback(errorMessge);
      return false;
    }
  }
}
