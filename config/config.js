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
        "database": "d1iv2u5kpp1rgq",
        "host": "ec2-54-72-155-238.eu-west-1.compute.amazonaws.com",
        "dialect": "postgres"
    }
}