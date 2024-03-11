import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('CheckService UseCase', () => { 
    const mockLogRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockLogRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockLogRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockLogRepo1, mockLogRepo2, mockLogRepo3],
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should Call sucessCallback and saveLog when fetch returns true', async () => {
        const wasSuccess = await checkService.execute('https://google.com');

        // Esperamos que el succes callback haya sido llamado
        expect(wasSuccess).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        // Esperamos que el error no haya sido llamado
        expect(errorCallback).not.toHaveBeenCalled();
        // Probar que saveLog haya sido llamado con una instancia de nuestro LogEntity
        expect(mockLogRepo1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepo2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepo3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('should Call errorCallback and saveLog when fetch returns false', async () => {
        const wasSuccess = await checkService.execute('https://google22.com');

        
        expect(wasSuccess).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        
        expect(errorCallback).toHaveBeenCalled();
       
        expect(mockLogRepo1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepo2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepo3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });
});