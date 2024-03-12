import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('Log repository imple', () => { 
    const logMockDataSourceRepository = {
        saveLog : jest.fn(),
        getLogs : jest.fn()
    }
    const logRepository = new LogRepositoryImpl(logMockDataSourceRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const log = new LogEntity({
        message:'Testing log repository implement',
        origin:'Origin test propio',
        level:LogSeverityLevel.low
    })
    test('save log should call the data source ', async() => { 
        // Debe de llamar el datasource con los argumentos
        await logRepository.saveLog(log)
        expect(logMockDataSourceRepository.saveLog).toHaveBeenCalledWith(log)
     });

    test('get logs should call the data source ', async() => { 
        // Debe de leer los  datasource con los argumentos
        const lowSeverity = LogSeverityLevel.low
        await logRepository.getLogs(lowSeverity);
        expect(logMockDataSourceRepository.getLogs).toHaveBeenCalledWith(lowSeverity);
     });
 })