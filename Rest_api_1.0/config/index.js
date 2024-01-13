import dotenv from 'dotenv';
dotenv.config();

export  const { APP_PORT, DEBUG_MODE, SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, MONGODB_USERNAME, MONGODB_PASSWORD}  = process.env;