import { envs } from "./config/plugin/envs.plugin";
import { Server } from "./presentation/server";
import { LogModel, MongoDataBase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(async () => {
  main();
})();

async function main() {
  MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();


  // Insercion a PostgreSql
  // const newLog = await prisma.logModel.create({
  //   data:{
  //     level:'LOW',
  //     message: 'Test Message',
  //     origin:'App.ts'
  //   }
  // });

  // console.log(newLog);



  // Leer Datos en PostgreSql
  // const logs = await prisma.logModel.findMany({
  //   where:{
  //     level:'MEDIUM'
  //   }
  // });
  // console.log(logs);


  Server.start();
  // console.log(envs);

  // // Crear una coleccion = tables, documento = registro / row
  // const newLog = await LogModel.create({
  //   message: "Creando registro en Mongo",
  //   origin: "app.ts",
  //   level: "low",
  // });

  // // Grabar en la base de datos
  // await newLog.save();
  // console.log(newLog);
  // const logs = await LogModel.find();
  // console.log(logs);
}
