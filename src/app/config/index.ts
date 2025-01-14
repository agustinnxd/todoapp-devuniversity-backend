require('dotenv').config();

export const config = { 
    MONGO_CNN: process.env.MONGO_CNN || "",
    PORT: Number(process.env.PORT) || 3000
}