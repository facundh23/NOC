import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";


describe('Test in send-email-logs.ts', () => { 

    afterEach(() => {
        jest.clearAllMocks()
    })
    // Mockeamos el email service y simulamos la funcion 
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    } 

    const mockLogRepository:LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    // Crear la instancia
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository 
    );

    test('Should call sendEmail and saveLog', async ()=>{
        // simulamos enviar el emaail este seria el parametro to por eso da true si si no mando parametro la rpueba falla
        const resolve = await sendEmailLogs.execute('hola@google.com')

        expect(resolve).toBe(true);

        // Si todo sale bien deberia guardarse nuestro log es decir que se haya llamado al menos una vez
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        // Y también testar que nuestro log respository haya sido llamado con nuestro log entity
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        // testear que nuestro logrepositoruy haya sido llamado con la información correcta
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email Send",
            "origin": "send-email-logs.ts",
        })

    });
    test('Should log in case of error', async ()=>{

        // Simulamos que nuestra funcion no funciono, con el false forzamos est
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        // simulamos enviar el emaail este seria el parametro to por eso da true si si no mando parametro la prueba falla
        const resolve = await sendEmailLogs.execute('hola@google.com')

        expect(resolve).toBe(false);

        // Si todo sale bien deberia guardarse nuestro log es decir que se haya llamado al menos una vez
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        // Y también testar que nuestro log respository haya sido llamado con nuestro log entity
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        // testear que nuestro logrepositoruy haya sido llamado con la información correcta
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error sending email",
            "origin": "send-email-logs.ts",
        })

    });


 });