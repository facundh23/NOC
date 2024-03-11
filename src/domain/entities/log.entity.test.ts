import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('Test in LogEntity.ts', () => {  
    const dataObj = {
        origin:'Test origin',
        level:LogSeverityLevel.high,
        message:'Hola Testeando el log entity'
    }
        test('should create a LogEntity instance', () => {

            const log = new LogEntity(dataObj);

            expect(log).toBeInstanceOf(LogEntity);
            expect(log.origin).toBe(dataObj.origin);
            expect(log.message).toBe(dataObj.message);
            expect(log.level).toBe(dataObj.level);
            expect(log.createdAt).toBeInstanceOf(Date)

        });

        test('should create a logEntity instance from JSON', () => {
            const json = `
                {
                    "message":"Service https://google.com/ working"
                    ,"level":"low",
                    "createdAt":"2024-03-08T07:05:50.410Z",
                    "origin":"check-service-multiple.ts"
                }
            `
            const log = LogEntity.fromJson(json)

            expect(log).toBeInstanceOf(LogEntity);
            expect(log.message).toBe("Service https://google.com/ working");
            expect(log.level).toBe(LogSeverityLevel.low);
            expect(log.createdAt).toBeInstanceOf(Date);
            expect(log.origin).toBe("check-service-multiple.ts");
        });

        test('should create a logentity instance form object ', () => {
            const log = LogEntity.fromObject(dataObj);

            expect(log).toBeInstanceOf(LogEntity);
            expect(log.origin).toBe(dataObj.origin);
            expect(log.message).toBe(dataObj.message);
            expect(log.level).toBe(dataObj.level);
            expect(log.createdAt).toBeInstanceOf(Date)
        });       
});