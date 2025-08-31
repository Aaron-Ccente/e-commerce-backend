import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;

export const DB_HOST = process.env.HOST;
export const DB_USER = process.env.USER;
export const DB_PASSWORD = process.env.PASSWORD;
export const DB_NAME = process.env.NAME;
export const DB_PORT = process.env.PORT;