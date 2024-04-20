import mongoose from "mongoose";

const mongo_url = "mongodb+srv://migueldelarosa229290:miguelAngelo19@activityhub.o17uxtg.mongodb.net/";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(mongo_url, {
        });
        const url = `${db.connection.host}, ${db.connection.port}`;
        console.log(`Apliacion conectada a la DB de: ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    };
};

export default conectarDB;