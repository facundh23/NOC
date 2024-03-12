import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


describe('Testing file-system.datasource.ts', () => {

    // Llegar al directorio donde guardaremos nuestro logs
    const logPath = path.join(__dirname,'../../../logs');
    console.log(logPath)
    // Antes de todas mis pruebas nos aseguramos que el logs no exista que este limpio
    beforeEach(() => {
        // Me elimina mi carpeta de logs
        fs.rmSync(logPath, {recursive:true, force:true})
    })

    test('Should create lof files if they do not exists', () => {
        // Se crea de nuevo la carpeta de logs 
        new FileSystemDataSource();

        const files = fs.readdirSync(logPath);
        // Estos son los archivos que existen dentro de mi logPath
        expect(files).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
    });

    test('should save a log in logs-all.log', () => {
        const logDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message:'Test in FyleSistemDatasource',
            origin:'Test un Fsdatasoure',
            level:LogSeverityLevel.low
        });

        logDataSource.saveLog(log);
        // Leemos la data desde el path
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        
        // Hago un stringify de mi contenido del log 
        expect(allLogs).toContain(JSON.stringify(log))
    });
    test('should save a log in logs-all.log and logs-medium.log', () => {
        const logDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message:'Test in FyleSistemDatasource',
            origin:'Test un Fsdatasoure',
            level:LogSeverityLevel.medium
        });

        logDataSource.saveLog(log);
        // Leemos la data desde el path
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        
        // Hago un stringify de mi contenido del log 
        expect(allLogs).toContain(JSON.stringify(log))
        expect(mediumLogs).toContain(JSON.stringify(log))
    });
    test('should save a log in logs-all.log and logs-high.log', () => {
        const logDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message:'Error Test in FyleSistemDatasource',
            origin:'Error Test un Fsdatasoure',
            level:LogSeverityLevel.high
        });

        logDataSource.saveLog(log);
        // Leemos la data desde el path
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        
        // Hago un stringify de mi contenido del log 
        expect(allLogs).toContain(JSON.stringify(log))
        expect(highLogs).toContain(JSON.stringify(log))
    });

    test('should return all logs', async() => {
        // RECORDAR QUE CREAMOS CADA ARCHIVO EN CADA TEST PORQUE CADA TEST ES AUTOSIFICIENTE
        const logDataSource = new FileSystemDataSource();


        // Creamos un log por cada nivel
        const logLow = new LogEntity({
            message:'low log',
            origin:'low',
            level:LogSeverityLevel.low
        });
        const mediumLow = new LogEntity({
            message:'medium log',
            origin:'medium',
            level:LogSeverityLevel.medium
        });
        const highLow = new LogEntity({
            message:'high log',
            origin:'high',
            level:LogSeverityLevel.high
        });

        // Guardamos los logs en su respectivo nivel 
        await logDataSource.saveLog(logLow);
        await logDataSource.saveLog(mediumLow);
        await logDataSource.saveLog(highLow);

        // Leemos los logs
        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

        // Consultamos si nuestro archivos tienen los archivos que creamos y guardamos antes
        expect(logsLow).toEqual(expect.arrayContaining([logLow, mediumLow, highLow]));
        expect(logsMedium).toEqual(expect.arrayContaining([ mediumLow]));
        expect(logsHigh).toEqual(expect.arrayContaining([ highLow]));
    });

    test('Should not throw an error if path exists', () => {
        // Cada prueba nosotros borramos el directorio
        // Este lo crea
        new FileSystemDataSource();
        // Este verifica que ya existe, por lo que se mandaria a llamar el return del fylesystem 
        new FileSystemDataSource();


    });

    test('Should throw an error if severity level is not defined', async () => {
        // 
        const logDataSource = new FileSystemDataSource();
        // Con el as hago que me lo tome typescript como un severity level, si no lo uso me lo toma como un string y me da error
        const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

        try {
            // Teste que no se ejecute
            await logDataSource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy();
        } catch (error) {
            // Se debe imprimir esto en consola
            const errorString = `${error}`
            expect(errorString).toContain(`${customSeverityLevel} not implemented`)
        }
    })
    
    
});
