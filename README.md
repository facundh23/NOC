# Proyecto NOC

The objective is to create a series of areas using clean architecture with typescript.

# dev

1. Crear el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando `npm install`
4. Levantar las bases de datos con el comando
```
    docker compose up -d
```
5. Ejecutar ```npx prisma migrate dev```
6. Ejecutar ``` npm run dev ```
