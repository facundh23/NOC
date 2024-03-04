import { envs } from "./config/envs.plugin";
import { Server } from "./presentation/server";
import { LogModel, MongoDataBase } from "./data/mongo";

(async () => {
  main();
})();

async function main() {
  MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
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
