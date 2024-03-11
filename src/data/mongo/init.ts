import mongoose from "mongoose";

interface ConectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
  static async connect(options: ConectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName:dbName,
      });
      return true
    } catch (error) {
      throw error;
    }
  }
}
