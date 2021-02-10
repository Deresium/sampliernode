module.exports = {
    development: {
        "username": process.env.PG_USER,
        "password": process.env.PG_PASSWORD,
        "database": "samplier-dev",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "seederStorage": "sequelize"
    },
    /*test: {
        "username": process.env.PG_USER,
        "password": process.env.PG_PASSWORD,
        "database": "cndistri-test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }*/
    production: {
        "username": process.env.PG_USER,
        "password": process.env.PG_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "dialectOptions":{
            "ssl": {
                "rejectUnauthorized": false
            }
        }
    }
}