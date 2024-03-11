import mongoose from "mongoose";
import { MongoDataBase } from "./init"

describe('init MongoDb',  () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should connect to MongoDb', async() => {    
        
        const conected  = await MongoDataBase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })
        
        expect(conected).toBe(true);
    });
    test('should return an connection error', async () => {
        try {
            const conected  = await MongoDataBase.connect({
                mongoUrl: 'asdsadasdass.cpom/10012',
                dbName: process.env.MONGO_DB_NAME!
            })
            expect(conected).toBe(false)
        } catch (error) {
            
        }
       
    })
    
    
})
