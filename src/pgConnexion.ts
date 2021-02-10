import {Sequelize} from "sequelize"

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    ssl: process.env.NODE_ENV === 'production'
});
const connect = async() => {
    console.log('try to connect...');
    try {
        await sequelize.authenticate();
        console.log('sequelize connexion ok');
    }catch(error){
        console.log('sequelize connexion failed');
    }
}

export{
    connect,
    sequelize
}