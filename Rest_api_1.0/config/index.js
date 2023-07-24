import dotenv from 'dotenv';
dotenv.config();

export  const { APP_PORT, DEBUG_MODE, SECRET_KEY, REFRESH_TOKEN_SECRET_KEY}  = process.env;