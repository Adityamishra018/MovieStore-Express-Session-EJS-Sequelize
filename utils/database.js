import { Sequelize } from "sequelize"

export default new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    host: 'aws.connect.psdb.cloud',
    "dialectOptions": {
        "ssl": {
            "require": true,
            "rejectUnauthorized": true
        }
    }
})
