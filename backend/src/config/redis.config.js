import dotenv from "dotenv";
dotenv.config();

import { createClient } from 'redis';

export const redis = createClient({
    ...(process.env.REDIS_USERNAME && { username: process.env.REDIS_USERNAME }),
    ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        reconnectStrategy: (retries) => Math.min(retries * 50, 2000)
    }
});

redis.on('error', err => console.log('Redis Client Error', err));

export async function connectRedis() {
    try {
        await redis.connect();
        console.log("Redis connected successfully");
        const pong = await redis.ping();
        console.log("Redis ping response:", pong);
    } catch (error) {
        console.error("Error connecting to Redis:", error);
    }
}
