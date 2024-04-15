import mongoose from 'mongoose';
import mysql from 'mysql2/promise';

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose || { conn: null, promise: null };

export const dbConnect = async () => {
    if (cached.conn) return cached.conn;
    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');
    cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: 'next-events',
        bufferCommands: false,
    });
    cached.conn = await cached.promise;
    return cached.conn;
};

export const dbMySQLConnect = async () => {
    const MYSQL_HOST = process.env.MYSQL_HOST;
    const MYSQL_USER = process.env.MYSQL_USER;
    const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
    const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

    return await mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
    });
};
