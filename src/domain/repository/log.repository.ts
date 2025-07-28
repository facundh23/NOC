import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// ? La funcion del log repository , es permitir a el desarrolador al  LogDataSource y sus metodos
// ? Nosotros nunca llegamos directamente al dataSurce
// ? El repositorio eventualente tendra el datasource y basado eneste lo podremos cambiar por cualquiera que nosotros queremos, asi evtiamos cambiar nuestros casos de uso

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
