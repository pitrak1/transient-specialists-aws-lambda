const pg = require('pg')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const client = new pg.Client(
  `postgres://${process.env.DB_MASTER_USERNAME}:${process.env.DB_MASTER_PASSWORD}@${process.env.DB_ENDPOINT}:5432/${process.env.DB_NAME}?ssl=1&integrated_security=1`,
)
client.connect()

exports.handler = async (event, context, cb) => {
  const result = await client.query('SELECT * FROM Equipments')
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: result.rows,
  }
}
