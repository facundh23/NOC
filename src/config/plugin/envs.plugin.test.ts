import { envs } from "./envs.plugin"

describe('Testing in envs.plugin.ts', () => {

    test('should return env options ', () => {

        expect(envs).toEqual({

            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'facundhfed@gmail.com',
            MAILER_SECRET_KEY: 'xnwsejxvhtqzsfkr',
            PROD: true,
            MONGO_URL: 'mongodb://facundo:12345678@localhost:27018',
            MONGO_USER: 'facundo',
            MONGO_PASS: '12345678',
            MONGO_DB_NAME: 'NOC-TEST'

        });
    });

    test('Should return error if not found env', async() => {
        jest.resetModules();
        process.env.PORT = 'ABC'

        try {
            await import( './envs.plugin');
            expect(true).toBe(false)
        } catch (error) {
            console.log(error)
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })

})
