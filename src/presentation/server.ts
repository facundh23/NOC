import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/emails/send-email-logs";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  new MongoLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started!!!");

    //? Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "facundhfed@gmail.com",
    //   "facunh23@gmail.com",
    // ]);
    // emailService.sendEmailWithFileSystemLogs([
    //   "facundhfed@gmail.com",
    //   "facunh23@gmail.com",
    // ]);
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com/";
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000");
    // });
  }
}
