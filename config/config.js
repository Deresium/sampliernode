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
        "database": "dp0fu85l7k2dg",
        "host": "ec2-34-247-118-233.eu-west-1.compute.amazonaws.com",
        "dialect": "postgres"
    }
}