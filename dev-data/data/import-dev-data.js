'use strict'

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../src/models/tour.model');

//CONNECT DATABASE
dotenv.config({ path: './.env' });
const { db: { host, port, name, username, password } } = require('./../../src/configs/config.mongodb');
const connectString = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`;
mongoose.connect(connectString);



// READ DATA FROM JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// IMPORT DATA
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('All data successfully deleted');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}