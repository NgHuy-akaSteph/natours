'use strict'

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { countConnect } = require('../helpers/check.connect');
dotenv.config({ path: './config.env' });

const connectString = process.env.DATABASE_LOCAL.
replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

class Database {

  constructor() {
    this.connect();
  }

  connect(type='mongodb'){

    if(1 === 1){
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose.connect(connectString)
      .then(_ => {
        console.log('>>> DB connection successful');
        countConnect();
      })
      .catch(err => {
        console.log('>>> DB connection failed');
        console.log(err);
      })
  }

  static getInstance() {
    if(!Database.instance){
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();
module.exports = {instanceMongoDb};