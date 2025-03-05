'use strict'


const mongoose = require('mongoose');
const os = require('os')
const process = require('process')
const _SECONDS = 5000;

//count connections
const countConnect = () => {
  const connConnection = mongoose.connections.length;
  console.log(`>>> Number of connections: ${connConnection}`);
}

//check overload connections
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    //example: maximum 5 connections per core
    const maxConnections = numCores * 5;

    console.log(`Active connections: ${numConnections}`);
    console.log(`>>> Memory usage: ${memoryUsage/1024/1024} MB`);

    if(numConnections > maxConnections - 5){
      console.log(`>>> Warning: High connections: ${numConnections}`);
    }

  }, _SECONDS); // Monitor every 5 seconds
}


module.exports = {
  countConnect,
  checkOverload
}