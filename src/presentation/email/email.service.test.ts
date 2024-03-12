import nodemailer from 'nodemailer';

import { EmailService, SendEmailOptions } from "./email.service";

describe('email.service.ts', () => {
    
    const mockSendMail = jest.fn();
    
    // Mock al create transport 
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    
    const emailService = new EmailService();
    test('should send email', async () => {

        const options: SendEmailOptions = {
            to: 'facundo@gmail.com',
            subject: 'test',
            htmlBody: '<h1>Testing</h1>'
        }

        await emailService.sendEmail(options);
        // Evaluar que nuestro mock haya sido llamado 
        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>Testing</h1>",
            "subject": "test",
            "to": "facundo@gmail.com",
        })
    });

    test('should send email with attachments', async () => {
       
        const email = 'test@test.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Server Logs',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: "logs-all.log", path: "./logs/logs-all.log" },
                { filename: "logs-high.log", path: "./logs/logs-high.log" },
                { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
            ])
        })
    })

});
