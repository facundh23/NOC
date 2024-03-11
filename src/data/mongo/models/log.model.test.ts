import mongoose from "mongoose";
import { envs } from "../../../config/plugin/envs.plugin";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";


describe('Test in LogModel', () => {

    // Nos conectamos a la base de datos
    beforeAll(async() => {
        await MongoDataBase.connect({
            mongoUrl:envs.MONGO_URL,
            dbName:envs.MONGO_DB_NAME
        })
    })
    // Despues de cada proceso cerramos la conexión para evitar errores en la consola
    afterAll(() => {
        mongoose.connection.close();
    })

    test('Should retirn LogModel', async () => {
        const logData = {
            origin:'Test Origin',
            message:'Test message',
            level:'low'
        }

        // Insertar nuestro log data en la base de datos
        const log = await LogModel.create(logData)
        console.log(log);
        /*  console.log
        {
            message: 'Test message',
            origin: 'Test Origin',
            level: 'low',
            createdAt: 2024-03-10T08:41:35.137Z,
            _id: new ObjectId('65ed723f943c3e91594a697f'),
            __v: 0
        }   
        */

        // Esperamos que nuestro log sea un objeto que contenga lo que cargamos en el logData y luego
        // el created At y id lo generamos como vemos en el ejemplo
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt:expect.any(Date),
            id:expect.any(String)
        }));

        // Eliminamos los registros de nuestra base de datos
        await LogModel.findByIdAndDelete(log.id);
    });

    test('Should return schema object',()=>{
        // Es el esquema de mi log.model 
        const schema = LogModel.schema.obj;
        /**
         * {
                message: { type: [Function: String], required: true },
                origin: { type: [Function: String] },
                level: {
                type: [Function: String],
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
                },
                createdAt: { type: [Function: Date], default: 2024-03-10T08:48:53.430Z }
             }
         * 
         */

        // console.log(schema);
        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: {
              type: expect.any(Function),
              enum: [ 'low', 'medium', 'high' ],
              default: 'low'
            },
            createdAt: expect.any(Object)
          }))
    });
});
