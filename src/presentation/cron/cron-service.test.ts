import { CronService } from "./cron-service";

describe('cron-service.ts', () => {

    const mockTic = jest.fn();
    // El done es para decirle al test que espera que se cumpla el settimeout antes de terminar
    test('should create a job', (done) => { 
        const job = CronService.createJob('* * * * * *', mockTic );

        setTimeout(() => {

            expect(mockTic).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000)
     });
})
