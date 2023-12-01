import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDataSource } from "../../domain/datasources/log.datasource";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly LogDataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.LogDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.LogDataSource.getLogs(severityLevel);
  }
}
