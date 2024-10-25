// 
// dbConfig.js
const sql = require('mssql');

const dbConfig = {
  user: 'sa',
  password: 'krishna123',
  server: 'localhost', // e.g., localhost or server IP
  database: 'mssqlconnection',
  options: {
    encrypt: true, // Use this if connecting to Azure SQL
    trustServerCertificate: true, // Change to true if using a self-signed certificate
  }
};

async function connectToDatabase() {
  try {
    let pool = await sql.connect(dbConfig);
    console.log("Connected to SQL Server");
    return pool;
  } catch (err) {
    console.error("Database connection failed: ", err);
    throw err;
  }
}

module.exports = { connectToDatabase };
