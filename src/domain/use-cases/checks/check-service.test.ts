import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('CheckService UseCase', () => { 
    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockLogRepository,
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
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('should Call errorCallback and saveLog when fetch returns false', async () => {
        const wasSuccess = await checkService.execute('https://google22.com');

        
        expect(wasSuccess).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        
        expect(errorCallback).toHaveBeenCalled();
       
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });
});