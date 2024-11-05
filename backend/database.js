const Pool = require('pg').Pool
require('dotenv').config()

const database = new Pool({

    connectionString: process.env.DATABASE_URL

    // user: process.env.PGUSER,
    // host: process.env.PGHOST,
    // database: process.env.PGDATABASE,
    // password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,
    // idleTimeoutMillis: 300000, // close idle clients after 5 minutes
    // connectionTimeoutMillis: 5000, // return an error after 5 second if connection could not be established
})

module.exports = {database}