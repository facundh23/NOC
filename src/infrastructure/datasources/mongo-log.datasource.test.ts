import mongoose from "mongoose";
import { envs } from "../../config/plugin/envs.plugin";
import { LogModel, MongoDataBase } from "../../data/mongo";
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('testing en mi mongo.log.datasource.ts', () => { 
    const logDataSource = new MongoLogDataSource();
    const log = new LogEntity({
        level:LogSeverityLevel.low,
        message:'Mongo testing data base',
        origin:'Test mongodb origin'
    })
    // Nos conectamos a la base de datos
    beforeAll(async () => {
        await MongoDataBase.connect({
            dbName:envs.MONGO_DB_NAME,
            mongoUrl:envs.MONGO_URL
        })
    })
    afterEach(async () => {
        // Borramos todos los logs que se creen en nuestro base de datos,
        // por eso es importante usar una base de datos en la nube o alguna diferente a la de desarrollo o produccion
        await LogModel.deleteMany()
    })
    // Y luego nos desconectamos 
    afterAll(async () => {
        mongoose.connection.close();
    })
    test('Should create a log', async() => {
        // Como esto lo que hace es un console log, podemos usar un spyON, este va a estar escuchando los console.logs
        const logSpy = jest.spyOn(console, 'log');
        await logDataSource.saveLog(log);

        // la primera vez me da un error, asi obtengo con que fue llamando el lospy, como el id es variable alcanza con poner expect.any(String)
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("mongo log saved", expect.any(String))
    });

    test('should get logs', async () => {
        // Creamos un log
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs(LogSeverityLevel.low)

        // Por eso el .length es 1
        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low)
    });
 })