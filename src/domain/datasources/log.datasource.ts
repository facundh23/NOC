import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


// ? La palabra abstract lo que hace es evitar que se pueda crear una instancia de la clase, no quiero que nadie cree instancias de mi data source directamente
//? Sirve para obligar el comportamiento que quiero definir en este data source sobre otras clases, es decir , cualquier clase que implemente mi logdatasource
//? tiene que tener lo que definamos dentro de mi clase abstracta
export abstract class LogDataSource {
   // ? recibe un log y devolvera un true o flase si se hace o no o un void   si no queremos regresar nada, esto obloga a cualquer origen de datos impleentar el saveLog
  abstract saveLog(log: LogEntity): Promise<void>;
  // ? Yo quiero recibir el nivel de severidad  y devolvera un Log entity como un arreglo 
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
