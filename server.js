import 'dotenv/config'

import app from './app.js'
import sequelize from "./utils/database.js"

process.on('uncaughtException', async err => {
    console.log('Uncaught exception, Shutting down...');
    console.log(err.name, err.message);
    await sequelize.close()
    await app.close()
    process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    console.log('Shutting down')
    await sequelize.close()
    await app.close()
    process.exit(1);
});



